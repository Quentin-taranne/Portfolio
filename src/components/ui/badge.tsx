import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Étiquettes de stack : rectangle net, texte mono en capitales.
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 border px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-[0.05em] uppercase whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-input text-foreground",
        signal: "border-signal-ink bg-signal text-signal-ink",
        sky: "border-signal-ink bg-sky text-signal-ink",
        ember: "border-signal-ink bg-ember text-signal-ink",
        solid: "border-primary bg-primary text-primary-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
