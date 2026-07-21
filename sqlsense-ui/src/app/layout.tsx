import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/features/auth/AuthContext";

export const metadata = {
  title: "SQLSense — Understand SQL Instantly",
  description:
    "Transform complex SQL queries into clear, human-readable explanations. Get instant insights into query structure, complexity, and optimization opportunities.",
  openGraph: {
    title: "SQLSense — Understand SQL Instantly",
    description:
      "Transform complex SQL queries into clear, human-readable explanations. Get instant insights into query structure, complexity, and optimization opportunities.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "SQLSense - Student Learning Lab Inquiry",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              {children}
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
