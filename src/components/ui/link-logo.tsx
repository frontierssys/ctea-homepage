import type { ComponentProps } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "#/lib/utils";

type LinkLogoProps = ComponentProps<'link'>
export function LinkLogo({ className }: LinkLogoProps) {
  return (
    <Link
      to="/"
      className={cn("flex min-h-14 shrink-0 items-center gap-4", className)}
      aria-label="中華民國馬術協會首頁"
    >
      <img
        src="/media/ctea-logo-nav.webp"
        alt="CTEA"
        width={80}
        height={80}
        className="h-10 w-auto"
        decoding="async"
      />
      <span className="min-w-0">
        <strong className="block whitespace-nowrap font-brand text-brand text-[#fffaf0] dark:text-[#f1eade]">
          中華民國馬術協會
        </strong>
        <span className="mt-1.5 block whitespace-nowrap font-sport text-meta text-[#d0ae6d] uppercase dark:text-[#a99267] max-sm:hidden">
          Chinese Taipei Equestrian Association
        </span>
      </span>
    </Link>
  )
}
