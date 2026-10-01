"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const PHONE_DISPLAY = "(310) 709-0581";
const PHONE_TEL = "+13107090581";

/**
 * The office number, as a link that does the useful thing on each device.
 *
 * On a phone or tablet (coarse pointer) it is a plain tel: link, so a tap
 * opens the dialler. On a computer a tel: link either does nothing or hands
 * off to whatever calling app happens to be registered, so there a click
 * copies the number instead and says so. It used to open WhatsApp everywhere,
 * which assumed every visitor uses WhatsApp.
 */
export default function PhoneLink({
  className,
  children,
  label = `Call ${PHONE_DISPLAY}`,
}: {
  className?: string;
  children?: ReactNode;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // let tel: dial
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
    } catch {
      // No clipboard access (old browser, insecure context): fall back to tel:.
      window.location.href = `tel:${PHONE_TEL}`;
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className={`phone-link${className ? ` ${className}` : ""}`}
      aria-label={label}
      onClick={onClick}
    >
      {children ?? PHONE_DISPLAY}
      <span className={`phone-copied${copied ? " is-on" : ""}`} role="status" aria-live="polite">
        {copied ? "Number copied" : ""}
      </span>
    </a>
  );
}
