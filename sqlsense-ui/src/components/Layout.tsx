"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function Layout({ children, currentPage }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "History", path: "/history" },
    { label: "Examples", path: "/examples" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path: string) => currentPage === path;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl md:text-2xl hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary border-2 border-black flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="hidden sm:inline">SQLSense</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 font-semibold text-sm uppercase transition-all cursor-pointer ${
                  isActive(item.path)
                    ? "bg-primary text-white border-2 border-primary"
                    : "text-foreground hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="border-4 border-primary bg-primary text-white font-bold uppercase text-sm px-4 py-2 inline-block transition-transform duration-150 ease-out cursor-pointer"
              style={{ boxShadow: "8px 8px 0px #6D28D9" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "4px 4px 0px #6D28D9";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "8px 8px 0px #6D28D9";
              }}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {sidebarOpen && (
          <nav className="md:hidden border-t-4 border-black bg-white">
            <div className="container py-4 flex flex-col gap-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`block px-4 py-3 font-semibold text-sm uppercase border-l-4 transition-all cursor-pointer ${
                    isActive(item.path)
                      ? "bg-primary text-white border-primary"
                      : "border-transparent hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t-2 border-gray-200">
                <Link
                  href="/sign-in"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold uppercase hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setSidebarOpen(false)}
                  className="block border-4 border-primary bg-primary text-white font-bold uppercase text-sm px-4 py-2 text-center transition-transform duration-150 ease-out cursor-pointer"
                  style={{ boxShadow: "8px 8px 0px #6D28D9" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "4px 4px 0px #6D28D9";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "8px 8px 0px #6D28D9";
                  }}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white mt-auto">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-bold text-lg mb-2">SQLSense</h3>
              <p className="text-sm text-muted-foreground">
                Understand SQL Instantly. Transform complex queries into clear
                explanations.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-sm uppercase mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/examples"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Examples
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Creator */}
            <div>
              <h4 className="font-bold text-sm uppercase mb-4">Creator</h4>
              <p className="text-sm font-semibold">Prosun Banerjee</p>
              <p className="text-xs text-muted-foreground mb-1">
                <a
                  href="mailto:prosunbanerjee8@gmail.com"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  prosunbanerjee8@gmail.com
                </a>
              </p>
              <div className="flex gap-3 text-xs text-muted-foreground mb-4">
                <a
                  href="https://github.com/prosu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors font-semibold cursor-pointer"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href="https://linkedin.com/in/prosun-banerjee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors font-semibold cursor-pointer"
                >
                  LinkedIn
                </a>
              </div>
              <button
                className="border-4 border-black bg-white text-black font-bold uppercase text-xs px-3 py-2 transition-transform duration-150 ease-out cursor-pointer"
                style={{ boxShadow: "8px 8px 0px #111111" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "4px 4px 0px #111111";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "8px 8px 0px #111111";
                }}
              >
                Built for Digital Heroes
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t-2 border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 SQLSense. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
