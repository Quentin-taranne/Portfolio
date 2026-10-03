import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Boutons « Classement » : angles droits, capitales mono, cible tactile ≥ 44 px.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 border font-mono text-xs tracking-[0.06em] uppercase whitespace-nowrap select-none transition-[background-color,color,transform] duration-200 ease-out-quart active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-signal hover:text-signal-ink hover:border-signal-ink",
        signal: "border-signal-ink bg-signal text-signal-ink hover:bg-primary hover:text-primary-foreground hover:border-primary",
        outline: "border-input bg-transparent text-foreground hover:bg-foreground hover:text-background",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-muted",
        link: "border-transparent px-0 text-foreground underline decoration-1 underline-offset-4 hover:decoration-2",
      },
      size: {
        default: "min-h-11 px-5",
        sm: "min-h-11 px-3",
        lg: "min-h-14 px-7 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
