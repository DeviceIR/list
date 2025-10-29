import React from "react";
import Link from "next/link";

import { ModeToggle } from "@/components/ui/ModeToggle";
import { motion } from "motion/react";
// import Cube from "./Cube";

export default function Navbar() {
  return (
    <nav
      className="text-4xl md:text-4xl font-bold  w-full h-[4rem]
    flex gap-2 justify-between items-center
    shadow-sm shadow-accent 
    px-4

    "
    >
      <Link href={""}>
        <motion.h2 className="text-4xl">DeviceIR</motion.h2>
      </Link>

      <div className="flex items-center justify-center gap-4 text-xl">
        <Link href="https://erfanbastani.ir" target="_blank">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-blue-500 hover:scale-105"
          >
            Portfolio
          </motion.h2>
        </Link>
        <ModeToggle />
        {/* <Cube /> */}
      </div>
    </nav>
  );
}
