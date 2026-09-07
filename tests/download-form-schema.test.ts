import { describe, expect, it } from "vitest";

import { downloadFormSchema, getDownloadFormErrors } from "@/lib/download-form-schema";

const validFields = {
  firstName: "Camille",
  lastName: "Martin",
  profession: "Planneuse stratégique",
  email: "camille@gmail.com",
};

describe("download form schema", () => {
  it("rejects empty required fields", () => {
    const result = downloadFormSchema.safeParse({
      firstName: "",
      lastName: "",
      profession: "",
      email: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(getDownloadFormErrors(result.error)).toEqual({
        firstName: "Indiquez votre prénom.",
        lastName: "Indiquez votre nom.",
        profession: "Indiquez votre profession.",
        email: "Saisissez une adresse e-mail valide.",
      });
    }
  });

  it("rejects an invalid email address", () => {
    const result = downloadFormSchema.safeParse({ ...validFields, email: "pas-un-email" });
    expect(result.success).toBe(false);
  });

  it("accepts public email domains and defaults optional consent to false", () => {
    const result = downloadFormSchema.parse(validFields);
    expect(result.email).toBe("camille@gmail.com");
    expect(result.marketingConsent).toBe(false);
    expect(result._gotcha).toBe("");
  });
});
