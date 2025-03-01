import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 duration-300",
  {
    variants: {
      variant: {
        default: "bg-ocean text-cloud hover:bg-cloud/5 duration-300",
        destructive: "bg-red-500 text-cloud hover:bg-red-600",
        outline: "bg-transparent border border-slate-200 hover:bg-slate-800",
        subtle: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        gradiantNavy:
          "bg-gradient-to-tl from-ocean to-deepocean hover:shadow-ocean hover:shadow-lg hover:opacity-95",
        gradiantNavySec:
          "bg-transparent border-ocean border-2 shadow-ocean hover:shadow-ocean hover:shadow-lg hover:opacity-85 shadow-inner hover:bg-gradient-to-tl hover:from-ocean 600 hover:to-deepocean",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn("", buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
