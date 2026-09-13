"use client";

import { useId, useRef, useState } from "react";
import { contactPage, enquiryDivisions } from "@/data/pages";

type Errors = Record<string, string>;
type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-b border-line-light bg-transparent py-3 text-on-light outline-none transition-colors placeholder:text-on-light-faint focus:border-forest-600";

export default function EnquiryForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const liveRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setMessage("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      // Static export has no route handlers; this is the PHP endpoint in public/.
      const res = await fetch("/enquiry.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        setMessage(json.error ?? "Please check the highlighted fields and try again.");
        return;
      }

      setStatus("sent");
      setMessage("Thank you — we've received your enquiry and will be in touch.");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("We couldn't send that just now. Please call us on +1(902) 452-7600.");
    }
  }

  const f = contactPage.form;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {/* Which division the enquiry is for — brief §23. */}
      <fieldset className="border-0 p-0">
        <legend className="eyebrow text-on-light-faint">What do you need?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {enquiryDivisions.map((d, i) => (
            <label
              key={d.value}
              className="cursor-pointer border border-line-light px-4 py-2 text-[0.82rem] transition-colors has-checked:border-forest-600 has-checked:bg-forest-600 has-checked:text-on-dark"
            >
              <input
                type="radio"
                name="division"
                value={d.value}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {d.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={`${id}-name`} name="name" label={f.name} required error={errors.name} />
        <Field id={`${id}-last`} name="lastName" label={f.lastName} required error={errors.lastName} />
        <Field id={`${id}-tel`} name="telephone" label={f.telephone} type="tel" required error={errors.telephone} />
        <Field id={`${id}-email`} name="email" label={f.email} type="email" required error={errors.email} />
      </div>

      <div>
        <label htmlFor={`${id}-msg`} className="eyebrow text-on-light-faint">
          {f.message}
        </label>
        <textarea id={`${id}-msg`} name="message" rows={5} className={`${field} mt-2 resize-y`} />
      </div>

      {/* Honeypot. Hidden from people and from assistive tech, visible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-co`}>Company</label>
        <input id={`${id}-co`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-[2px] bg-forest-600 px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-on-dark transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : f.submit}
        </button>

        <p
          ref={liveRef}
          role="status"
          aria-live="polite"
          className={`text-[0.9rem] ${
            status === "error" ? "text-[#9E2F26]" : "text-forest-600"
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
      <label htmlFor={id} className="eyebrow text-on-light-faint">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${field} mt-2 ${error ? "border-[#9E2F26]" : ""}`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[0.82rem] text-[#9E2F26]">
          {error}
        </p>
      )}
    </div>
  );
}
