import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ProgressProvider } from "@/context/ProgressContext";
import AnimatedProgressWrapper from "@/components/AnimatedProgressWrapper";
import { ListProvider } from "@/context/ListContext";

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
            {/* fake load bar on top */}
            <AnimatedProgressWrapper />
            {/* list provider for all components */}
            <ListProvider>{children}</ListProvider>
          </ThemeProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
