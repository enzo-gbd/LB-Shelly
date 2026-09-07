import type { AnchorHTMLAttributes, ReactNode } from "react";

type CtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "navy" | "light";
};

export function Cta({ children, className = "", variant = "navy", ...props }: CtaProps) {
  const palette =
    variant === "navy"
      ? "border-navy bg-navy text-off-white hover:bg-off-white hover:text-navy"
      : "border-off-white bg-off-white text-navy hover:bg-transparent hover:text-off-white";

  return (
    <a
      className={`group inline-flex min-h-14 items-center justify-center gap-4 rounded-full border-2 px-6 py-3.5 text-sm font-extrabold tracking-[-0.01em] transition-colors duration-300 sm:min-h-16 sm:px-8 sm:text-base ${palette} ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full bg-current/10 transition-transform duration-300 group-hover:translate-y-0.5"
      >
        <svg viewBox="0 0 20 20" className="size-4" fill="none">
          <path
            d="M10 3v10m0 0 4-4m-4 4L6 9M4 17h12"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      </span>
    </a>
  );
}
