import { AuthorSection } from "@/components/sections/author-section";
import { DocumentPreview } from "@/components/sections/document-preview";
import { DownloadForm } from "@/components/sections/download-form";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats-section";
import { StrategySection } from "@/components/sections/strategy-section";
import { StudyPreview } from "@/components/sections/study-preview";
import { TensionSection } from "@/components/sections/tension-section";

export default function Home() {
  const formspreeFormId = process.env.FORMSPREE_FORM_ID ?? "";

  return (
    <main>
      <Hero />
      <TensionSection />
      <StatsSection />
      <StrategySection />
      <StudyPreview />
      <DocumentPreview />
      <AuthorSection />
      <DownloadForm formId={formspreeFormId} />
      <Footer />
    </main>
  );
}
