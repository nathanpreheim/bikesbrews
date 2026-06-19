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
        { ok: false, message: "Please check the survey fields and try again." },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const emailFrom = process.env.EMAIL_FROM;

    console.log("Bikes and Brews survey submission", payload);

    if (resendApiKey && contactEmail && emailFrom) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: emailFrom,
        to: [contactEmail],
        subject: `New bikesandbrews.co survey response: ${payload.email}`,
        replyTo: payload.email,
        text: [
          "New Bikes and Brews validation survey response",
          `Email: ${payload.email}`,
          `Audience type: ${payload.audienceType}`,
          `Most true statement: ${payload.coreProblem}`,
          `Most appealing experience: ${payload.appealingExperience}`,
          `Self-guided interest: ${payload.selfGuidedInterest}`,
          `Biking appeal: ${payload.bikingAppeal}`,
          `Storytelling interest: ${payload.storytellingInterest}`,
          `Premium price: ${payload.premiumPrice}`,
          `Area suggestion: ${payload.areaSuggestion || "Not provided"}`,
          `Additional notes: ${payload.additionalNotes || "Not provided"}`
        ].join("\n")
      });
    } else {
      // TODO: Set RESEND_API_KEY, CONTACT_EMAIL, and EMAIL_FROM in Vercel to turn on email delivery.
      console.log("Resend delivery skipped because email env vars are not fully configured.");
    }

    await trackEvent("survey_completed", {
      email: payload.email,
      selfGuidedInterest: payload.selfGuidedInterest,
      premiumPrice: payload.premiumPrice
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks. You may have just helped shape something fun."
    });
  } catch (error) {
    console.error("Survey submission failed", error);

    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
