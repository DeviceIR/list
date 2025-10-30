import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      Boolean(props.value || props.defaultValue)
    );

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
            setHasValue(Boolean((e.target as HTMLInputElement).value));
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(Boolean(e.target.value));
            props.onChange?.(e);
          }}
        />

        <motion.label
          animate={{
            y: isFocused || hasValue ? -18 : 4, // stays up if focused or has value
            opacity: isFocused || hasValue ? 0.6 : 1,
            scale: isFocused || hasValue ? 0.85 : 1,
          }}
          transition={{
            duration: 0.4,
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
