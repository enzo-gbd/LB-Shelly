import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DownloadForm } from "@/components/sections/download-form";

vi.mock("@/lib/client-analytics", () => ({ trackClientEvent: vi.fn() }));

const successfulResponse = {
  ok: true,
  json: async () => ({ success: true }),
};

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Prénom"), "Camille");
  await user.type(screen.getByLabelText("Nom"), "Martin");
  await user.type(screen.getByLabelText("Profession"), "Planneuse stratégique");
  await user.type(
    screen.getByLabelText("Adresse e-mail professionnelle"),
    "camille@example.com",
  );
}

describe("download form", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("announces empty-field errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<DownloadForm />);

    await user.click(screen.getByRole("button", { name: /télécharger le livre blanc/i }));

    expect(screen.getAllByRole("alert")).toHaveLength(4);
    expect(screen.getByLabelText("Prénom")).toHaveFocus();
    expect(screen.getByText("Indiquez votre prénom.")).toBeVisible();
    expect(screen.getByText("Saisissez une adresse e-mail valide.")).toBeVisible();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("disables duplicate submissions while the request is loading", async () => {
    const user = userEvent.setup();
    let resolveRequest: ((value: typeof successfulResponse) => void) | undefined;
    const fetchMock = vi.fn(
      () =>
        new Promise<typeof successfulResponse>((resolve) => {
          resolveRequest = resolve;
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    render(<DownloadForm />);
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: /télécharger le livre blanc/i }));

    const loadingButton = screen.getByRole("button", { name: /envoi en cours/i });
    expect(loadingButton).toBeDisabled();
    expect(loadingButton.closest("form")).toHaveAttribute("aria-busy", "true");

    resolveRequest?.(successfulResponse);
    await waitFor(() => expect(screen.getByRole("status")).toBeVisible());
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("keeps values and permits a retry when the API fails", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false }),
      }),
    );
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    render(<DownloadForm />);
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: /télécharger le livre blanc/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("L’envoi n’a pas abouti");
    expect(screen.getByLabelText("Prénom")).toHaveValue("Camille");
    expect(
      screen.getByRole("button", { name: /télécharger le livre blanc/i }),
    ).toBeEnabled();
    expect(click).not.toHaveBeenCalled();
  });

  it("downloads after server success without requiring marketing consent", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(successfulResponse);
    vi.stubGlobal("fetch", fetchMock);
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    render(<DownloadForm />);
    await fillRequiredFields(user);

    expect(screen.getByLabelText(/j’accepte de recevoir/i)).not.toBeChecked();
    await user.click(screen.getByRole("button", { name: /télécharger le livre blanc/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Bonne lecture ! Votre livre blanc est en cours de téléchargement.",
    );
    expect(screen.getByRole("link", { name: "Télécharger le PDF" })).toHaveAttribute(
      "href",
      "/livre-blanc-shelly-sarkar.pdf",
    );
    expect(click).toHaveBeenCalledOnce();
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      email: "camille@example.com",
      marketingConsent: false,
      website: "",
    });
  });
});
