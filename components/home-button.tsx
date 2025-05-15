import Link from "next/link"

export function HomeButton() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="text-lg font-semibold">mano10</span>
    </Link>
  )
}
