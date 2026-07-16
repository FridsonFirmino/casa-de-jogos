"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS } from "@/constants/navigation";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
              <span className="text-sm font-bold text-white">CG</span>
            </div> */}
            <span className="text-2xl font-bold text-zinc-100">
              Casa de <span className="text-violet-400">Jogos</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
            <button
              aria-label="Search"
              className="text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <Search className="h-5 w-5" />
            </button>
            <Button size="sm">Explorar Jogos</Button>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-zinc-400 transition-colors hover:text-zinc-100 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </Container>

      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-zinc-950/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-center gap-6 py-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
            <Button size="lg" className="mt-4">
              Explorar Jogos
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
