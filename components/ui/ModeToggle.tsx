"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/ProgressContext";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const progressRef = useProgress();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleToggle = async () => {
    progressRef.current?.start();

    // wait the duration of the animation (e.g., 1.5s)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="relative transition-all duration-300 ease-in-out"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 opacity-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
