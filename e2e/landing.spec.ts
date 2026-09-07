import { expect, test, type Page } from "@playwright/test";

function collectBrowserErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test("presents the editorial narrative and downloads through the form", async ({
  page,
}) => {
  const browserErrors = collectBrowserErrors(page);
  let submittedLead: Record<string, unknown> | undefined;
  await page.route("https://formspree.io/f/test-form-id", async (route) => {
    submittedLead = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /s’adapter ou devenir invisible/i }),
  ).toBeVisible();
  await expect(page.getByAltText(/couverture du livre blanc/i).first()).toBeVisible();

  await page.getByRole("link", { name: "Télécharger le livre blanc" }).click();
  await expect(page.locator("#download")).toBeInViewport();

  await page.getByRole("button", { name: "Télécharger le livre blanc" }).click();
  await expect(page.getByText("Indiquez votre prénom.")).toBeVisible();

  await page.getByLabel("Prénom", { exact: true }).fill("Camille");
  await page.getByLabel("Nom", { exact: true }).fill("Martin");
  await page.getByLabel("Profession", { exact: true }).fill("Planneuse stratégique");
  await page
    .getByLabel("Adresse e-mail professionnelle", { exact: true })
    .fill("camille@example.com");
  await expect(page.getByLabel(/j’accepte de recevoir/i)).not.toBeChecked();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Télécharger le livre blanc" }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("livre-blanc-shelly-sarkar.pdf");
  await expect(page.getByRole("status")).toContainText(
    "Bonne lecture ! Votre livre blanc est en cours de téléchargement.",
  );
  await expect(page.getByRole("link", { name: "Télécharger le PDF" })).toHaveAttribute(
    "href",
    "/livre-blanc-shelly-sarkar.pdf",
  );
  expect(submittedLead).toMatchObject({
    firstName: "Camille",
    email: "camille@example.com",
    marketingConsent: "Non",
  });
  expect(browserErrors).toEqual([]);
});

test("keeps every section within the viewport", async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto("/");

  const layout = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const overflowingElements = Array.from(
      document.querySelectorAll(
        "main h1, main h2, main h3, main p, main a, main button, main input, main label",
      ),
    )
      .filter((element) => {
        if (element.closest('[aria-hidden="true"]')) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);

        return (
          styles.display !== "none" &&
          rect.width > 0 &&
          (rect.left < -1 || rect.right > viewportWidth + 1)
        );
      })
      .map((element) => ({
        className: element.getAttribute("class"),
        tag: element.tagName,
      }));

    return {
      clientWidth: viewportWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflowingElements,
    };
  });

  expect(layout.scrollWidth).toBe(layout.clientWidth);
  expect(layout.overflowingElements).toEqual([]);
  expect(browserErrors).toEqual([]);
});
