import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="flex flex-col gap-1 relative">
        {label && <label className="text-sm font-medium">{label}</label>}

        <input
          ref={ref}
          {...props}
          className={cn(
            "peer flex h-10 w-full border-b border-gray-400 px-3 pt-2 pb-2 text-sm placeholder-transparent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          placeholder={props.placeholder}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />

        {/* Overlay label acting as placeholder */}
        <motion.label
          initial={{
            y: 32, // moves down/up
            opacity: 0,
          }}
          animate={{
            y: isFocused ? 32 : 0, // moves down/up
            opacity: isFocused ? 0.5 : 1, // fade
          }}
          transition={{
            duration: 0.5, // slower animation
            ease: "easeInOut",
          }}
          className="absolute left-3 top-2 text-sm text-muted-foreground pointer-events-none"
        >
          {props.placeholder}
        </motion.label>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
