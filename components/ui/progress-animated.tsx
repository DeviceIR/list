"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export interface AnimatedProgressHandle {
  start: () => void;
}

interface AnimatedProgressProps {
  duration?: number;
  onComplete?: () => void;
}

const AnimatedProgress = React.forwardRef<
  AnimatedProgressHandle,
  AnimatedProgressProps
>(({ duration = 1500, onComplete }, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const start = () => {
    setVisible(true);
    setProgress(0);

    const startTime = performance.now();
    const step = (time: number) => {
      const elapsed = time - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
          onComplete?.();
        }, 200);
      }
    };

    requestAnimationFrame(step);
  };

  // expose start() to parent via ref
  React.useImperativeHandle(ref, () => ({
    start,
  }));

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md z-50">
      <Progress value={progress} className="h-2 rounded-full" />
    </div>
  );
});

AnimatedProgress.displayName = "AnimatedProgress";

export default AnimatedProgress;
