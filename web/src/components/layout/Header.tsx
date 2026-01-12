"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/swap", label: "Swap" },
  { href: "/liquidity", label: "Pools" },
  { href: "/vote", label: "Vote" },
  { href: "/lock", label: "Lock" },
  { href: "/rewards", label: "Rewards" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "var(--window-bg)",
        borderBottom: "2px solid",
        borderColor: "var(--bevel-light) var(--bevel-dark) var(--bevel-dark) var(--bevel-light)",
        padding: "4px 8px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--text-primary)" }}>
          <img
            src="/images/meridian-new-logo.jpg"
            alt="Meridian"
            style={{ height: "24px", width: "auto" }}
          />
          <strong>Meridian DEX</strong>
        </Link>

        {/* Navigation */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: pathname === link.href ? "var(--window-title-active)" : undefined,
                  color: pathname === link.href ? "var(--window-title-text)" : undefined,
                }}
              >
                {link.label}
              </button>
            </Link>
          ))}
        </nav>

        {/* Wallet */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="hidden sm:block">
            <ConnectButton chainStatus="icon" showBalance={false} accountStatus="address" />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            style={{ minWidth: "32px" }}
          >
            ≡
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            marginTop: "4px",
            padding: "8px",
            borderTop: "1px solid var(--bevel-dark)",
          }}
        >
          <div className="sm:hidden" style={{ marginBottom: "8px" }}>
            <ConnectButton chainStatus="icon" showBalance={false} />
          </div>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "4px",
                  textAlign: "left",
                  background: pathname === link.href ? "var(--window-title-active)" : undefined,
                  color: pathname === link.href ? "var(--window-title-text)" : undefined,
                }}
              >
                {link.label}
              </button>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
