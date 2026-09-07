import { afterEach, describe, expect, it, vi } from "vitest";

const { sendLeadEmailMock } = vi.hoisted(() => ({ sendLeadEmailMock: vi.fn() }));

vi.mock("@/lib/send-lead-email", () => ({ sendLeadEmail: sendLeadEmailMock }));

import { POST } from "@/app/api/leads/route";

const validPayload = {
  firstName: "Camille",
  lastName: "Martin",
  profession: "Planneuse stratégique",
  email: "camille@example.com",
  marketingConsent: false,
  website: "",
};

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

describe("POST /api/leads", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    sendLeadEmailMock.mockReset();
  });

  it("sends a valid lead and returns success", async () => {
    sendLeadEmailMock.mockResolvedValue({ id: "email_123" });

    const response = await post(validPayload);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(sendLeadEmailMock).toHaveBeenCalledWith({
      firstName: "Camille",
      lastName: "Martin",
      profession: "Planneuse stratégique",
      email: "camille@example.com",
      marketingConsent: false,
    });
  });

  it("rejects an invalid payload before contacting Resend", async () => {
    const response = await post({ ...validPayload, email: "incorrect" });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.fieldErrors.email).toBe("Saisissez une adresse e-mail valide.");
    expect(sendLeadEmailMock).not.toHaveBeenCalled();
  });

  it("returns a generic retryable error when Resend fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    sendLeadEmailMock.mockRejectedValue(new Error("private provider details"));

    const response = await post(validPayload);
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.message).toContain("veuillez réessayer");
    expect(JSON.stringify(body)).not.toContain("private provider details");
  });

  it("silently accepts a filled honeypot without sending an email", async () => {
    const response = await post({ ...validPayload, website: "https://spam.example" });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(sendLeadEmailMock).not.toHaveBeenCalled();
  });
});
