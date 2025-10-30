import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  rows?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, rows = 6, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      Boolean(props.value || props.defaultValue)
    );

    return (
      <div className="relative w-full">
        {/* Textarea */}
        <textarea
          ref={ref}
          rows={rows}
          {...props}
          placeholder={label} // hidden by label
          className={cn(
            "peer w-full rounded-md border border-gray-400 px-3 pt-6 pb-3 text-sm placeholder-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(Boolean((e.target as HTMLTextAreaElement).value));
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(Boolean(e.target.value));
            props.onChange?.(e);
          }}
        />

        {/* Floating label */}
        <motion.label
          animate={{
            y: isFocused || hasValue ? -8 : 8, // up when focused/has value, down otherwise
            opacity: isFocused || hasValue ? 0.6 : 1,
            scale: isFocused || hasValue ? 0.85 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute left-3 top-3 text-sm text-muted-foreground pointer-events-none bg-none px-1"
        >
          {label}
        </motion.label>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
