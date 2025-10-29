import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ProgressProvider } from "@/context/ProgressContext";
import AnimatedProgressWrapper from "@/components/AnimatedProgressWrapper";

export const metadata: Metadata = {
  title: "SavvyTask",
  description: "Created by DeviceIR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ProgressProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {/* ✅ progress animation handled inside wrapper */}
            <AnimatedProgressWrapper />
            {children}
          </ThemeProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
