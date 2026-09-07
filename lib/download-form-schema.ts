import { z } from "zod";

const requiredText = (message: string, maximum: number) =>
  z.string({ error: message }).trim().min(1, message).max(maximum, message);

export const downloadFormSchema = z
  .object({
    firstName: requiredText("Indiquez votre prénom.", 100),
    lastName: requiredText("Indiquez votre nom.", 100),
    profession: requiredText("Indiquez votre profession.", 160),
    email: z
      .string({ error: "Saisissez une adresse e-mail valide." })
      .trim()
      .max(320, "Saisissez une adresse e-mail valide.")
      .email("Saisissez une adresse e-mail valide."),
    marketingConsent: z.boolean().optional().default(false),
    website: z.string().trim().max(200).optional().default(""),
  })
  .strict();

export type DownloadFormValues = z.infer<typeof downloadFormSchema>;
export type DownloadFieldName = Exclude<
  keyof DownloadFormValues,
  "marketingConsent" | "website"
>;

export function getDownloadFormErrors(error: z.ZodError<DownloadFormValues>) {
  const fields = z.flattenError(error).fieldErrors;

  return {
    firstName: fields.firstName?.[0],
    lastName: fields.lastName?.[0],
    profession: fields.profession?.[0],
    email: fields.email?.[0],
  } satisfies Partial<Record<DownloadFieldName, string | undefined>>;
}
