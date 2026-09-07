import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy py-8 text-off-white">
      <Container className="flex flex-col gap-5 border-t border-sky-light/30 pt-8 text-xs font-bold sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-extrabold uppercase">S’adapter ou devenir invisible&nbsp;?</p>
          <p className="mt-1 text-sky-light">Shelly Sarkar</p>
        </div>
        <p className="text-sky-light">© {year} Shelly Sarkar</p>
      </Container>
    </footer>
  );
}
