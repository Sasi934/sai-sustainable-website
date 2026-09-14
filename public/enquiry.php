<?php
/**
 * Enquiry endpoint for Hostinger Business Web Hosting.
 *
 * The site is a static export, so there is no Node runtime — this PHP script
 * replaces the /api/enquiry route handler. It sends through the domain's own
 * mailbox rather than a third-party service, so there is no API key to manage.
 *
 * Mirrors the Node version's behaviour exactly: JSON in, JSON out, server-side
 * validation, honeypot, rate limiting, and a hard refusal rather than a silent
 * success when mail cannot be sent.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const MAIL_TO      = 'info@saisustainable.com';
const MAIL_FROM    = 'website@saisustainable.com';
const EMERGENCY_NO = '+1(902) 452-7600';
const MAX_MESSAGE  = 5000;
const RATE_LIMIT   = 5;     // submissions
const RATE_WINDOW  = 60;    // seconds

function respond(int $status, array $body): never {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$raw  = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

$field = static fn(string $k): string => trim((string)($data[$k] ?? ''));

// Honeypot: accept and discard so bots get no signal.
if ($field('company') !== '') {
    respond(200, ['ok' => true]);
}

// Rate limit per IP, stored in the system temp dir.
$ip   = (string)($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$ip   = trim(explode(',', $ip)[0]);
$file = sys_get_temp_dir() . '/sai_rl_' . sha1($ip);
$now  = time();
$hits = [];
if (is_readable($file)) {
    $decoded = json_decode((string)file_get_contents($file), true);
    if (is_array($decoded)) {
        $hits = array_filter($decoded, static fn($t): bool => is_int($t) && ($now - $t) < RATE_WINDOW);
    }
}
if (count($hits) >= RATE_LIMIT) {
    respond(429, ['ok' => false, 'error' => 'Too many requests. Please try again shortly.']);
}
$hits[] = $now;
@file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);

// Validation — same rules and wording as the Node version.
$errors = [];
if ($field('name') === '')      { $errors['name']      = 'Please enter your name.'; }
if ($field('lastName') === '')  { $errors['lastName']  = 'Please enter your last name.'; }
if ($field('telephone') === '') { $errors['telephone'] = 'Please enter a telephone number.'; }

$email = $field('email');
if ($email === '') {
    $errors['email'] = 'Please enter your email address.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "That email address doesn't look right.";
}
if (strlen($field('message')) > MAX_MESSAGE) {
    $errors['message'] = 'Please shorten your message.';
}
if ($errors) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

$division = in_array($field('division'), ['environmental', 'exim', 'it', 'construction'], true)
    ? $field('division')
    : 'unspecified';

// Optional routing fields (SAI Group form, 2026-09-14). Length-capped; header-safe below.
$intent       = mb_substr($field('enquiryType'), 0, 60);
$organisation = mb_substr($field('organisation'), 0, 120);

// Strip CR/LF from anything that reaches a header, so nothing can inject one.
$safeHeader = static fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);

$subject = $safeHeader(sprintf(
    'Website enquiry — %s%s — %s %s',
    $division,
    $intent !== '' ? ' — ' . $intent : '',
    $field('name'),
    $field('lastName')
));

$body = implode("\n", [
    'Division: ' . $division,
    'Enquiry type: ' . ($intent !== '' ? $intent : 'General'),
    'Organisation: ' . ($organisation !== '' ? $organisation : '-'),
    'Name: ' . $field('name') . ' ' . $field('lastName'),
    'Telephone: ' . $field('telephone'),
    'Email: ' . $email,
    '',
    $field('message') !== '' ? $field('message') : '(no message)',
]);

$headers = implode("\r\n", [
    'From: SAI Website <' . MAIL_FROM . '>',
    'Reply-To: ' . $safeHeader($field('name') . ' ' . $field('lastName')) . ' <' . $safeHeader($email) . '>',
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
]);

$sent = @mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);

if (!$sent) {
    // Never report success for an enquiry that was not delivered.
    error_log('[enquiry] mail() failed for ' . $email);
    respond(500, [
        'ok'    => false,
        'error' => 'We couldn\'t send that just now. Please call us on ' . EMERGENCY_NO . '.',
    ]);
}

respond(200, ['ok' => true, 'delivered' => true]);
