type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
  markClassName?: string;
};

function Mark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Slim headrail */}
      <rect x="1" y="3" width="34" height="2" fill="var(--brand)" />
      {/* Vertical panels drawing open — clearer gaps so white navbar reads through */}
      <rect x="1" y="7.5" width="7.5" height="21.5" fill="var(--brand)" />
      <rect x="11" y="7.5" width="5.5" height="18" fill="var(--brand)" />
      <rect x="19" y="7.5" width="4" height="14" fill="var(--brand)" />
      <rect x="25.5" y="7.5" width="2.5" height="10" fill="var(--brand)" />
      {/* Soft light wedge in the cleared opening */}
      <path d="M29.5 7.5H31.5V20L29.5 16.5V7.5Z" fill="var(--brand)" opacity="0.35" />
    </svg>
  );
}

export function Logo({ tone = "light", className = "", markClassName }: LogoProps) {
  const word = tone === "dark" ? "text-white" : "text-black";
  const sub = tone === "dark" ? "text-[#A8ADAD]" : "text-muted";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark className={markClassName ?? "h-9 w-auto"} />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-heading text-[15px] font-semibold tracking-[0.18em] uppercase ${word} sm:text-[16px]`}
        >
          Mireva
        </span>
        <span
          className={`mt-1 font-heading text-[10px] font-semibold tracking-[0.16em] uppercase ${sub}`}
        >
          Window Studio
        </span>
      </span>
    </span>
  );
}
