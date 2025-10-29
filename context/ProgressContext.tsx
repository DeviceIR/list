"use client";

import React, { createContext, useContext, useRef, RefObject } from "react";
import { AnimatedProgressHandle } from "@/components/ui/progress-animated";

// Ref type: can be null initially (as required by React refs)
type ProgressContextType = RefObject<AnimatedProgressHandle | null>;

// Create the context
const ProgressContext = createContext<ProgressContextType | null>(null);

// Provider component
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

// Hook for consuming the context
export const useProgress = (): RefObject<AnimatedProgressHandle | null> => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
};
