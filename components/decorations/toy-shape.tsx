type ToyShapeProps = {
  className?: string;
  kind?: "arch" | "block" | "flower" | "star";
};

export function ToyShape({ className = "", kind = "block" }: ToyShapeProps) {
  if (kind === "star") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 72 72" fill="none">
        <path
          d="m36 5 7.4 20.8L66 26.4 48.1 39.9 54.5 62 36 49.5 17.5 62l6.4-22.1L6 26.4l22.6-.6L36 5Z"
          fill="currentColor"
          stroke="#10284f"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "flower") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 80 80" fill="none">
        <circle
          cx="40"
          cy="19"
          r="16"
          fill="currentColor"
          stroke="#10284f"
          strokeWidth="3"
        />
        <circle
          cx="61"
          cy="40"
          r="16"
          fill="currentColor"
          stroke="#10284f"
          strokeWidth="3"
        />
        <circle
          cx="40"
          cy="61"
          r="16"
          fill="currentColor"
          stroke="#10284f"
          strokeWidth="3"
        />
        <circle
          cx="19"
          cy="40"
          r="16"
          fill="currentColor"
          stroke="#10284f"
          strokeWidth="3"
        />
        <circle cx="40" cy="40" r="13" fill="#fffdf7" stroke="#10284f" strokeWidth="3" />
      </svg>
    );
  }

  if (kind === "arch") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 100 100" fill="none">
        <path
          d="M7 93V50a43 43 0 0 1 86 0v43H68V51a18 18 0 0 0-36 0v42H7Z"
          fill="currentColor"
          stroke="#10284f"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 88 88" fill="none">
      <path
        d="M8 25 44 7l36 18v41L44 84 8 66V25Z"
        fill="currentColor"
        stroke="#10284f"
        strokeWidth="3"
      />
      <path d="m8 25 36 19 36-19M44 44v40" stroke="#10284f" strokeWidth="3" />
      <path d="m27 16 36 19" stroke="#fffdf7" strokeWidth="3" opacity=".8" />
    </svg>
  );
}
