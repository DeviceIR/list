"use client";

import AnimatedProgress from "@/components/ui/progress-animated";
import { useProgress } from "@/context/ProgressContext";

export default function AnimatedProgressWrapper() {
  const progressRef = useProgress();
  return <AnimatedProgress ref={progressRef} />;
}
