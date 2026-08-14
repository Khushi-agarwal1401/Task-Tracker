interface LogoProps {
  size?: number
  animated?: boolean
}

const CHECK_LENGTH = 30

export default function Logo({ size = 28, animated = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={animated ? { animation: "popIn 0.4s ease both" } : undefined}
    >
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#0d9488" />
      <circle cx="36" cy="12" r="4.5" fill="#ea580c" />
      <path
        d="M15 25l7 7 12-15"
        stroke="#fff"
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={animated ? CHECK_LENGTH : 0}
        strokeDashoffset={animated ? CHECK_LENGTH : 0}
        style={animated ? { animation: "drawCheck 0.5s ease-out 0.2s forwards" } : undefined}
      />
    </svg>
  )
}
