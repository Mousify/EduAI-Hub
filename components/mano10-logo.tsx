export function Mano10Logo({
  className = "",
  width = 120,
  height = 40,
}: { className?: string; width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M30 15H40L55 45V15H65V65H55L40 35V65H30V15Z" fill="currentColor" />
      <path d="M75 15H100L110 50L120 15H145V65H135V25H134L122 65H98L86 25H85V65H75V15Z" fill="currentColor" />
      <path d="M155 15H165V65H155V15Z" fill="currentColor" />
      <path
        d="M175 40C175 25 185 15 200 15C215 15 225 25 225 40C225 55 215 65 200 65C185 65 175 55 175 40ZM215 40C215 30 210 25 200 25C190 25 185 30 185 40C185 50 190 55 200 55C210 55 215 50 215 40Z"
        fill="#2563EB"
      />
    </svg>
  )
}

export function Mano10LogoSmall({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M4 4H5.5L7.5 10V4H9V16H7.5L5.5 10V16H4V4Z" fill="currentColor" />
      <path d="M10 4H14L15.5 12L17 4H21V16H19.5V6H19L17 16H14L12 6H11.5V16H10V4Z" fill="currentColor" />
      <path d="M22 4H23.5V16H22V4Z" fill="currentColor" />
      <path
        d="M24.5 10C24.5 6 26 4 29 4C32 4 33.5 6 33.5 10C33.5 14 32 16 29 16C26 16 24.5 14 24.5 10ZM32 10C32 7 31 5.5 29 5.5C27 5.5 26 7 26 10C26 13 27 14.5 29 14.5C31 14.5 32 13 32 10Z"
        fill="#2563EB"
      />
    </svg>
  )
}
