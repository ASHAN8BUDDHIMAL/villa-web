type Props = {
  color?: string;       // icon fill color
  textColor?: string;   // "Villa Galle" text color
  subColor?: string;    // tagline color
  size?: number;        // icon height in px
};

export default function VillaLogo({
  color    = "#FFFFFF",
  textColor = "#FFFFFF",
  subColor  = "#ADBFDF",
  size     = 44,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {/* SVG Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer circle */}
        <circle cx="22" cy="22" r="21" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />

        {/* Villa arch / building */}
        <path
          d="M10 30 L10 20 Q10 13 17 13 L27 13 Q34 13 34 20 L34 30"
          stroke={color}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Arch doorway */}
        <path
          d="M18 30 L18 24 Q18 20 22 20 Q26 20 26 24 L26 30"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />

        {/* Roof line */}
        <path
          d="M8 30 L36 30"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Palm tree left */}
        <line x1="8" y1="30" x2="8" y2="24" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M8 24 Q5 21 4 19" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M8 24 Q6 20 7 18" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M8 24 Q10 20 11 18" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />

        {/* Palm tree right */}
        <line x1="36" y1="30" x2="36" y2="24" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M36 24 Q39 21 40 19" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M36 24 Q38 20 37 18" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M36 24 Q34 20 33 18" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />

        {/* Ocean waves */}
        <path
          d="M6 34 Q9 32 12 34 Q15 36 18 34 Q21 32 24 34 Q27 36 30 34 Q33 32 36 34 Q39 36 42 34"
          stroke={color}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M6 37 Q9 35 12 37 Q15 39 18 37 Q21 35 24 37 Q27 39 30 37 Q33 35 36 37 Q39 39 42 37"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className="font-display tracking-wide"
          style={{ color: textColor, fontSize: size * 0.7 }}
        >
          Villa Galle
        </span>
        <span
          className="font-mono uppercase tracking-[0.25em]"
          style={{ color: subColor, fontSize: size * 0.22 }}
        >
          Southern Coast · Sri Lanka
        </span>
      </div>
    </div>
  );
}
