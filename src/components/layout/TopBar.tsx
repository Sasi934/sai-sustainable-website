import { company, contact } from "@/data/company";

/** Approved announcement line + primary contact. Present on every page today. */
export default function TopBar() {
  return (
    <div className="hidden border-b border-line-dark bg-ink text-on-dark-muted lg:block">
      <div className="container flex items-center justify-between gap-8 py-2.5 text-[0.74rem]">
        <p className="truncate">{company.announcement}</p>
        <p className="flex shrink-0 items-center gap-5">
          <a className="hover:text-on-dark" href={contact.phones[0].href}>
            {contact.phones[0].number}
          </a>
          <span aria-hidden="true" className="text-on-dark-faint">/</span>
          <a className="hover:text-on-dark" href={contact.emails[0].href}>
            {contact.emails[0].address}
          </a>
        </p>
      </div>
    </div>
  );
}
