import { NextResponse } from "next/server";

import { downloadFormSchema, getDownloadFormErrors } from "@/lib/download-form-schema";
import { sendLeadEmail } from "@/lib/send-lead-email";

export const runtime = "nodejs";

const invalidPayloadResponse = (fieldErrors?: ReturnType<typeof getDownloadFormErrors>) =>
  NextResponse.json(
    {
      success: false,
      message: "Vérifiez les informations saisies puis réessayez.",
      fieldErrors,
    },
    { status: 400 },
  );

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return invalidPayloadResponse();
  }

  const result = downloadFormSchema.safeParse(payload);

  if (!result.success) {
    return invalidPayloadResponse(getDownloadFormErrors(result.error));
  }

  const { website, ...lead } = result.data;

  // Honeypot submissions receive a neutral response without sending an email.
  if (website) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendLeadEmail(lead);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead notification failed.", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "L’envoi n’a pas abouti. Vos informations sont conservées : veuillez réessayer.",
      },
      { status: 502 },
    );
  }
}
