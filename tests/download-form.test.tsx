import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DownloadForm } from "@/components/sections/download-form";

vi.mock("@/lib/client-analytics", () => ({ trackClientEvent: vi.fn() }));

const successfulResponse = {
  ok: true,
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

function renderForm() {
  return render(<DownloadForm formId="test-form-id" />);
}

describe("download form", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("announces empty-field errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderForm();

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
    renderForm();
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: /télécharger le livre blanc/i }));

    const loadingButton = screen.getByRole("button", { name: /envoi en cours/i });
    expect(loadingButton).toBeDisabled();
    expect(loadingButton.closest("form")).toHaveAttribute("aria-busy", "true");
    await user.click(loadingButton);
    expect(fetchMock).toHaveBeenCalledOnce();

    resolveRequest?.(successfulResponse);
    await waitFor(() => expect(screen.getByRole("status")).toBeVisible());
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("keeps values and permits a retry when Formspree returns an HTTP error", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    renderForm();
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: /télécharger le livre blanc/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Une erreur est survenue lors de l’envoi",
    );
    expect(screen.getByLabelText("Prénom")).toHaveValue("Camille");
    expect(
      screen.getByRole("button", { name: /télécharger le livre blanc/i }),
    ).toBeEnabled();
    expect(click).not.toHaveBeenCalled();
  });

  it("does not download after a network error", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Network error")));
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    renderForm();
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: /télécharger le livre blanc/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Vérifiez votre connexion et réessayez",
    );
    expect(click).not.toHaveBeenCalled();
  });

  it("downloads after Formspree success without requiring marketing consent", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(successfulResponse);
    vi.stubGlobal("fetch", fetchMock);
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    renderForm();
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
    expect(fetchMock).toHaveBeenCalledWith(
      "https://formspree.io/f/test-form-id",
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    );
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      firstName: "Camille",
      lastName: "Martin",
      profession: "Planneuse stratégique",
      email: "camille@example.com",
      marketingConsent: "Non",
      _gotcha: "",
    });
  });

  it("uses Formspree’s compatible honeypot field", () => {
    const { container } = renderForm();
    const honeypot = container.querySelector<HTMLInputElement>('input[name="_gotcha"]');

    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
