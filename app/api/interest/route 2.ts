import { NextResponse } from "next/server";
import { Resend } from "resend";
import { trackEvent } from "@/lib/analytics";
import { interestFormSchema } from "@/lib/interest-form";

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const parsed = interestFormSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Please check the form fields and try again." },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    console.log("Bikes and Brews interest submission", payload);

    if (resendApiKey && contactEmail) {
      const resend = new Resend(resendApiKey);

      // TODO: Replace the from address with a verified sending domain before production launch.
      await resend.emails.send({
        from: "Bikes and Brews <launch@updates.example.com>",
        to: [contactEmail],
        subject: `New Bikes and Brews interest: ${payload.email}`,
        replyTo: payload.email,
        text: [
          "New Bikes and Brews validation submission",
          `First name: ${payload.firstName || "Not provided"}`,
          `Email: ${payload.email}`,
          `Local / visitor: ${payload.locationType}`,
          `Likelihood: ${payload.usageLikelihood}`,
          `Most appealing use case: ${payload.appealType}`,
          `Audio interest: ${payload.audioInterest}`,
          `Bike access: ${payload.bikeAccess}`,
          `Neighborhood or brewery suggestion: ${payload.neighborhoodSuggestion || "Not provided"}`
        ].join("\n")
      });
    } else {
      // TODO: Set RESEND_API_KEY and CONTACT_EMAIL in Vercel to turn on email delivery.
      console.log("Resend delivery skipped because launch env vars are not configured.");
    }

    await trackEvent("interest_form_submitted", {
      email: payload.email,
      interestLevel: payload.usageLikelihood,
      premiumInterest: payload.audioInterest
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks for helping shape launch. You’re on the early access list."
    });
  } catch (error) {
    console.error("Interest submission failed", error);

    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
