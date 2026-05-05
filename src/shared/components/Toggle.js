"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

export default function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  className,
}) {
  const sizes = {
    sm: {
      track: "w-8 h-4",
      thumb: "size-3",
      translate: "translate-x-4",
      translateValue: 16, // 4 * 4px = 16px
    },
    md: {
      track: "w-11 h-6",
      thumb: "size-5",
      translate: "translate-x-5",
      translateValue: 20, // 5 * 4px = 20px
    },
    lg: {
      track: "w-14 h-7",
      thumb: "size-6",
      translate: "translate-x-7",
      translateValue: 28, // 7 * 4px = 28px
    },
  };

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer rounded-full",
          "transition-colors duration-200 ease-in-out",
          "focus:outline-none focus:ring-1 focus:ring-primary/30",
          checked
            ? "bg-primary"
            : "bg-black/10 dark:bg-white/20",
          sizes[size].track,
          disabled && "cursor-not-allowed"
        )}
      >
        <motion.span
          animate={{ x: checked ? sizes[size].translateValue : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow-sm",
            sizes[size].thumb,
            "mt-0.5"
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-text-main">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-text-muted">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

