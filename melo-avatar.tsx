import Image from "next/image"
import { cn } from "@/lib/utils"

// Avatar da mascote Melo usando a arte oficial
export function MeloAvatar({
  className,
  rounded = "rounded-2xl",
  showDot = false,
}: {
  className?: string
  rounded?: string
  showDot?: boolean
}) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <div className={cn("h-full w-full overflow-hidden bg-primary", rounded)}>
        <Image
          src="/melo-bee.jpeg"
          alt="Melo, a abelha mascote do Money Bee"
          width={96}
          height={96}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      {showDot && (
        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-accent" />
      )}
    </div>
  )
}
