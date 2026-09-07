import { Resend } from "resend";
import { z } from "zod";

import type { DownloadFormValues } from "@/lib/download-form-schema";

type Lead = Omit<DownloadFormValues, "website">;

type EmailPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
};

type SendEmail = (
  payload: EmailPayload,
) => Promise<{ data?: { id: string } | null; error?: unknown }>;

type SendLeadEmailOptions = {
  env?: Record<string, string | undefined>;
  now?: () => Date;
  send?: SendEmail;
};

const resendEnvironmentSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().min(1),
  LEAD_RECIPIENT_EMAIL: z.string().email(),
});

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

export function buildLeadEmail(lead: Lead, date: Date) {
  const consent = lead.marketingConsent ? "Oui" : "Non";
  const serverDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "long",
    timeZone: "UTC",
  }).format(date);
  const rows = [
    ["Prénom", lead.firstName],
    ["Nom", lead.lastName],
    ["Profession", lead.profession],
    ["Email", lead.email],
    ["Consentement communications", consent],
    ["Date", `${serverDate} (UTC)`],
  ] as const;

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:10px 14px;text-align:left;vertical-align:top;border-bottom:1px solid #dbe5ef;color:#10284f;font-family:Arial,sans-serif;font-size:14px;">${escapeHtml(label)}</th>
          <td style="padding:10px 14px;border-bottom:1px solid #dbe5ef;color:#27486f;font-family:Arial,sans-serif;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return {
    html: `<!doctype html>
      <html lang="fr">
        <body style="margin:0;padding:24px;background:#f5fbfd;">
          <div style="max-width:640px;margin:0 auto;padding:28px;background:#fffdf7;border:1px solid #dbe5ef;border-radius:18px;">
            <h1 style="margin:0 0 20px;color:#10284f;font-family:Arial,sans-serif;font-size:24px;line-height:1.25;">Nouveau téléchargement du livre blanc</h1>
            <table role="presentation" style="width:100%;border-collapse:collapse;">${htmlRows}</table>
          </div>
        </body>
      </html>`,
    text: [
      "Nouveau téléchargement du livre blanc",
      "",
      ...rows.map(([label, value]) => `${label} : ${value}`),
    ].join("\n"),
  };
}

export async function sendLeadEmail(lead: Lead, options: SendLeadEmailOptions = {}) {
  const config = resendEnvironmentSchema.parse(options.env ?? process.env);
  const content = buildLeadEmail(lead, options.now?.() ?? new Date());
  const payload: EmailPayload = {
    from: config.RESEND_FROM_EMAIL,
    to: [config.LEAD_RECIPIENT_EMAIL],
    subject: "Nouveau téléchargement du livre blanc",
    ...content,
  };
  const send =
    options.send ??
    ((message: EmailPayload) => new Resend(config.RESEND_API_KEY).emails.send(message));
  const { data, error } = await send(payload);

  if (error || !data) {
    throw new Error("Resend did not confirm the email delivery request.");
  }

  return data;
}
