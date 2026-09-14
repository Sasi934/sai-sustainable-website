import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      name,
      lastName,
      telephone,
      email,
      message,
      division,
      company,
      enquiryType,
      organisation,
    } = data;

    // Honeypot — silently reject bots
    if (company) {
      return NextResponse.json({ ok: true });
    }

    const errors: Record<string, string> = {};

    if (!name?.trim()) {
      errors.name = "Please enter your first name.";
    }

    if (!lastName?.trim()) {
      errors.lastName = "Please enter your last name.";
    }

    if (!telephone?.trim()) {
      errors.telephone = "Please enter your telephone number.";
    }

    if (!email?.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!message?.trim()) {
      errors.message = "Please enter a message.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          errors,
          error: "Please check the highlighted fields and try again.",
        },
        { status: 400 }
      );
    }

    // Optional routing fields. Single-line and length-capped, because both reach the subject line.
    const oneLine = (v: unknown, max = 120) =>
      typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
    const intent = oneLine(enquiryType, 60);
    const org = oneLine(organisation);
    const divisionLabel =
      ({ environmental: "Environmental, Restoration & Manpower", exim: "EXIM", it: "IT Solutions" } as Record<string, string>)[
        String(division)
      ] ?? "Not specified";

    const { error } = await resend.emails.send({
      from: "Sai Sustainable Website <website@saisustainable.com>",
      to: process.env.ENQUIRY_TO || "info@saisustainable.com",
      replyTo: email,
      subject: `Website Enquiry — ${divisionLabel}${intent ? ` — ${intent}` : ""} — ${oneLine(name, 60)} ${oneLine(lastName, 60)}`,
      text: `
New website enquiry

Division: ${divisionLabel}
Enquiry type: ${intent || "General"}
${org ? `Organisation: ${org}\n` : ""}
Name: ${name} ${lastName}
Telephone: ${telephone}
Email: ${email}

Message:
${message}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't send that just now. Please call us on +1(902) 452-7600.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      delivered: true,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send that just now. Please call us on +1(902) 452-7600.",
      },
      { status: 500 }
    );
  }
}