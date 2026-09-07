import { describe, expect, it, vi } from "vitest";

import { buildLeadEmail, sendLeadEmail } from "@/lib/send-lead-email";

const lead = {
  firstName: "Camille <script>",
  lastName: "Martin & Associés",
  profession: "Planning",
  email: "camille@example.com",
  marketingConsent: false,
};

const environment = {
  RESEND_API_KEY: "re_test",
  RESEND_FROM_EMAIL: "Livre blanc <leads@example.com>",
  LEAD_RECIPIENT_EMAIL: "shelly@example.com",
};

describe("lead email", () => {
  it("builds readable HTML and text without allowing injected markup", () => {
    const content = buildLeadEmail(lead, new Date("2026-09-07T12:30:00.000Z"));

    expect(content.html).toContain("Nouveau téléchargement du livre blanc");
    expect(content.html).toContain("Camille &lt;script&gt;");
    expect(content.html).toContain("Martin &amp; Associés");
    expect(content.html).not.toContain("Camille <script>");
    expect(content.text).toContain("Consentement communications : Non");
    expect(content.text).toContain("Date : 7 septembre 2026");
  });

  it("sends the configured message through Resend", async () => {
    const send = vi.fn().mockResolvedValue({ data: { id: "email_123" }, error: null });

    const result = await sendLeadEmail(lead, {
      env: environment,
      now: () => new Date("2026-09-07T12:30:00.000Z"),
      send,
    });

    expect(result).toEqual({ id: "email_123" });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: environment.RESEND_FROM_EMAIL,
        to: [environment.LEAD_RECIPIENT_EMAIL],
        subject: "Nouveau téléchargement du livre blanc",
      }),
    );
  });

  it("turns a Resend rejection into an internal error", async () => {
    const send = vi.fn().mockResolvedValue({ data: null, error: { message: "denied" } });

    await expect(sendLeadEmail(lead, { env: environment, send })).rejects.toThrow(
      "Resend did not confirm",
    );
  });
});
