import Link from "next/link"
import { Mano10Logo } from "@/components/mano10-logo"

export function HomeButton() {
  return (
    <Link href="/" className="flex items-center">
      <Mano10Logo width={120} height={40} className="text-white" />
    </Link>
  )
}
