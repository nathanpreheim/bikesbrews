import { NextResponse } from "next/server";
import { Resend } from "resend";
import { trackEvent } from "@/lib/analytics";

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as Record<string, unknown>;
    const email = normalize(json.email);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: "Please enter a valid email." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const emailFrom = process.env.EMAIL_FROM;

    console.log("Bikes and Brews early access email", { email });

    if (resendApiKey && contactEmail && emailFrom) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: emailFrom,
        to: [contactEmail],
        subject: `New bikesandbrews.co early access signup: ${email}`,
        replyTo: email,
        text: [`New repeated CTA signup`, `Email: ${email}`].join("\n")
      });
    } else {
      // TODO: Set RESEND_API_KEY, CONTACT_EMAIL, and EMAIL_FROM in Vercel to turn on email delivery.
      console.log("Resend delivery skipped because email env vars are not fully configured.");
    }

    await trackEvent("email_submit", { email, source: "repeated_cta" });

    return NextResponse.json({
      ok: true,
      message: "You’re on the list for the next reveal."
    });
  } catch (error) {
    console.error("Early access submission failed", error);

    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
