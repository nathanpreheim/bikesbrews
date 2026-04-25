export type InterestFormPayload = {
  email: string;
  audienceType: string;
  coreProblem: string;
  appealingExperience: string;
  selfGuidedInterest: string;
  bikingAppeal: string;
  storytellingInterest: string;
  premiumPrice: string;
  areaSuggestion: string;
  additionalNotes: string;
};

type ParseSuccess = {
  success: true;
  data: InterestFormPayload;
};

type ParseFailure = {
  success: false;
};

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export const interestFormSchema = {
  safeParse(input: unknown): ParseSuccess | ParseFailure {
    if (!input || typeof input !== "object") {
      return { success: false };
    }

    const record = input as Record<string, unknown>;
    const payload: InterestFormPayload = {
      email: normalize(record.email),
      audienceType: normalize(record.audienceType),
      coreProblem: normalize(record.coreProblem),
      appealingExperience: normalize(record.appealingExperience),
      selfGuidedInterest: normalize(record.selfGuidedInterest),
      bikingAppeal: normalize(record.bikingAppeal),
      storytellingInterest: normalize(record.storytellingInterest),
      premiumPrice: normalize(record.premiumPrice),
      areaSuggestion: normalize(record.areaSuggestion),
      additionalNotes: normalize(record.additionalNotes)
    };

    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);

    if (
      !emailLooksValid ||
      !isNonEmptyString(payload.audienceType) ||
      !isNonEmptyString(payload.coreProblem) ||
      !isNonEmptyString(payload.appealingExperience) ||
      !isNonEmptyString(payload.selfGuidedInterest) ||
      !isNonEmptyString(payload.bikingAppeal) ||
      !isNonEmptyString(payload.storytellingInterest) ||
      !isNonEmptyString(payload.premiumPrice)
    ) {
      return { success: false };
    }

    return { success: true, data: payload };
  }
};
