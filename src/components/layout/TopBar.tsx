import { contact, group } from "@/data/company";

/** Utility strip: the group's three divisions on the left, the 24/7 line and inbox on the right. */
export default function TopBar() {
  const emergency = contact.phones.find((p) => p.emergency)!;
  return (
    <div className="hidden border-b border-line-dark bg-ink text-on-dark-muted lg:block">
      <div className="container flex items-center justify-between gap-8 py-2 text-[0.74rem]">
        <p className="truncate">
          <span className="font-semibold text-on-dark">{group.name}</span>
          <span aria-hidden="true" className="mx-3 text-on-dark-faint">/</span>
          {group.divisionsLine}
        </p>
        <p className="flex shrink-0 items-center gap-5">
          <a className="hover:text-on-dark" href={emergency.href}>
            <span className="text-on-dark-faint">24/7 emergency</span> {emergency.number}
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
