"use client";

import React, { createContext, useContext, useRef, RefObject } from "react";
import { AnimatedProgressHandle } from "@/components/ui/progress-animated";

type ProgressContextType = RefObject<AnimatedProgressHandle | null>;

const ProgressContext = createContext<ProgressContextType | null>(null);

// provider
export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const progressRef = useRef<AnimatedProgressHandle | null>(null);

  return (
    <ProgressContext.Provider value={progressRef}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): RefObject<AnimatedProgressHandle | null> => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
};
