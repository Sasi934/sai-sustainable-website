"use client";

import { useEffect, useId, useRef, useState } from "react";
import { contactPage, enquiryDivisions, enquiryTypes, type EnquiryType } from "@/data/pages";

type DivisionValue = (typeof enquiryDivisions)[number]["value"];

type Errors = Record<string, string>;
type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-b border-line-light bg-transparent py-3 text-on-light outline-none transition-colors placeholder:text-on-light-faint focus:border-signal-ink";

export default function EnquiryForm({
  defaultDivision = "environmental",
  type,
  hint,
  showOrganisation = false,
}: {
  defaultDivision?: DivisionValue;
  /** Fixed enquiry intent for dedicated pages (demo, supplier, careers …). */
  type?: EnquiryType;
  /** Helper text under the message field. */
  hint?: string;
  /** Adds an optional organisation field (suppliers, demo requests). */
  showOrganisation?: boolean;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const liveRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /*
    Deep links such as /contact-us?division=exim&type=quote pre-select the form.
    Applied straight to the uncontrolled inputs after mount rather than through
    state, so the server render and hydration stay identical and nothing
    re-renders. Only known values are accepted.
  */
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);

    const division = params.get("division");
    if (division && enquiryDivisions.some((d) => d.value === division)) {
      const radio = form.querySelector<HTMLInputElement>(`input[name="division"][value="${division}"]`);
      if (radio) radio.checked = true;
    }

    const intent = params.get("type");
    if (!type && intent && intent in enquiryTypes) {
      const hidden = form.querySelector<HTMLInputElement>('input[name="enquiryType"]');
      if (hidden) hidden.value = enquiryTypes[intent as EnquiryType];
      const note = form.querySelector<HTMLElement>("[data-intent]");
      if (note) {
        note.textContent = enquiryTypes[intent as EnquiryType];
        note.hidden = false;
      }
    }
  }, [type]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("idle");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Frontend validation
    const validationErrors: Errors = {};

    if (!String(data.name ?? "").trim()) {
      validationErrors.name = "Please enter your first name.";
    }

    if (!String(data.lastName ?? "").trim()) {
      validationErrors.lastName = "Please enter your last name.";
    }

    if (!String(data.telephone ?? "").trim()) {
      validationErrors.telephone = "Please enter your telephone number.";
    }

    const email = String(data.email ?? "").trim();

    if (!email) {
      validationErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!String(data.message ?? "").trim()) {
      validationErrors.message = "Please enter your message.";
    }

    // Stop here if validation fails
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setMessage("Please check the highlighted fields and try again.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        setMessage(
          json.error ??
            "Please check the highlighted fields and try again."
        );
        return;
      }

      setStatus("sent");
      setMessage(
        "Thank you — we've received your enquiry and will be in touch."
      );

      form.reset();
    } catch (error) {
      console.error("Enquiry submission error:", error);

      setStatus("error");
      setMessage(
        "We couldn't send that just now. Please call us on +1(902) 452-7600."
      );
    }
  }

  const f = contactPage.form;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <input type="hidden" name="enquiryType" defaultValue={type ? enquiryTypes[type] : ""} />
      <p data-intent hidden className="eyebrow -mb-2 text-signal-ink" />

      {/* Which division the enquiry is for */}
      <fieldset className="border-0 p-0">
        <legend className="eyebrow text-on-light-faint">
          Which division?
        </legend>

        <div className="mt-4 flex flex-wrap gap-2">
          {enquiryDivisions.map((d) => (
            <label
              key={d.value}
              className="cursor-pointer rounded-[2px] border border-line-light px-4 py-2.5 text-[0.84rem] transition-colors hover:border-on-light/40 has-checked:border-btn-light has-checked:bg-btn-light has-checked:text-btn-light-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-signal-ink"
            >
              <input
                type="radio"
                name="division"
                value={d.value}
                defaultChecked={d.value === defaultDivision}
                className="sr-only"
              />
              {d.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Required fields */}
      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="name"
          label={f.name}
          required
          error={errors.name}
        />

        <Field
          id={`${id}-last`}
          name="lastName"
          label={f.lastName}
          required
          error={errors.lastName}
        />

        <Field
          id={`${id}-tel`}
          name="telephone"
          label={f.telephone}
          type="tel"
          required
          error={errors.telephone}
        />

        <Field
          id={`${id}-email`}
          name="email"
          label={f.email}
          type="email"
          required
          error={errors.email}
        />

        {/* Named "organisation", never "company" — that name is the honeypot. */}
        {showOrganisation && (
          <div className="sm:col-span-2">
            <Field id={`${id}-org`} name="organisation" label="Organisation" />
          </div>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor={`${id}-msg`}
          className="eyebrow text-on-light-faint"
        >
          {f.message}
          <span aria-hidden="true"> *</span>
        </label>
        {hint && (
          <p id={`${id}-msg-hint`} className="mt-2 text-[0.86rem] leading-relaxed text-on-light-muted">
            {hint}
          </p>
        )}

        <textarea
          id={`${id}-msg`}
          name="message"
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={[hint && `${id}-msg-hint`, errors.message && `${id}-msg-err`].filter(Boolean).join(" ") || undefined}
          className={`${field} mt-2 resize-y ${
            errors.message ? "border-[#9E2F26]" : ""
          }`}
        />

        {errors.message && (
          <p
            id={`${id}-msg-err`}
            className="mt-2 text-[0.82rem] text-[#9E2F26]"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from users and assistive technology */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${id}-co`}>Company</label>

        <input
          id={`${id}-co`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-[2px] bg-btn-light px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-btn-light-ink transition-colors hover:bg-btn-light-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : f.submit}
        </button>

        <p
          ref={liveRef}
          role="status"
          aria-live="polite"
          className={`text-[0.9rem] ${
            status === "error"
              ? "text-[#9E2F26]"
              : "text-signal-ink"
          }`}
        >
          {message}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="eyebrow text-on-light-faint"
      >
        {label}

        {required && (
          <span aria-hidden="true"> *</span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${field} mt-2 ${
          error ? "border-[#9E2F26]" : ""
        }`}
      />

      {error && (
        <p
          id={`${id}-err`}
          className="mt-2 text-[0.82rem] text-[#9E2F26]"
        >
          {error}
        </p>
      )}
    </div>
  );
}