import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  children?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ className, type, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-9 w-full items-center rounded-md border border-white/70  bg-transparent " +
            "px-3 py-1 text-base shadow-xs transition-[color,box-shadow] " +
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium " +
            "placeholder:text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] " +
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 selection:bg-primary " +
            "selection:text-primary-foreground md:text-sm dark:bg-input/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
      >
        <input
          type={type}
          className="w-full min-w-0 bg-transparent outline-none disabled:opacity-50"
          {...props}
        />
        {children}
      </div>
    );
  },
);

Input.displayName = "Input";
