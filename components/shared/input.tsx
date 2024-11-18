import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "text-xs flex h-10 w-full rounded-lg border border-cloud/10 bg-cloud/5 px-3 py-2 text-sm backdrop-blur-lg placeholder:text-cloud/50 focus:outline-none focus:ring-1 focus:ring-cloud/30 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
