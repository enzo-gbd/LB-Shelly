type CloudDecorationProps = {
  className?: string;
  outlined?: boolean;
};

export function CloudDecoration({
  className = "",
  outlined = false,
}: CloudDecorationProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 220 100"
      fill="none"
      focusable="false"
    >
      <path
        d="M40 84C18 84 4 72 4 55c0-16 12-28 29-29C39 11 53 2 70 2c22 0 40 14 45 34 7-6 17-10 28-10 23 0 42 17 44 39 17 0 29 6 29 19H40Z"
        fill={outlined ? "transparent" : "currentColor"}
        stroke={outlined ? "currentColor" : "none"}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
