"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { List } from "@/components/ui/ItemGroup";
import AnimatedProgress from "@/components/ui/progress-animated";
import Navbar from "@/components/Navbar";

export default function Home() {
  const progressRef = useRef<{ start: () => void }>(null);

  return (
    <motion.main
      className="bg-background text-foreground  flex flex-col items-center justify-center gap-8 "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Navbar />

      <AnimatedProgress ref={progressRef} />

      <Button
        onClick={() => {
          progressRef.current?.start?.();
        }}
      >
        Trigger Progress
      </Button>

      <List />
    </motion.main>
  );
}
