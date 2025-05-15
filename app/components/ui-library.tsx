import { cn } from "~/utils/misc";

import React from "react";
import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

type StickyNoteTextButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children: React.ReactNode;
  };

export function StickyNoteTextButton({
  className,
  children,
  ...props
}: StickyNoteTextButtonProps) {
  return (
    <button className={cn("", className)} {...props}>
      <p className="text-link-blue hover:text-link-blue-hover text-5xl align-middle text-center">
        {children}
      </p>
    </button>
  );
}

export function StickyNoteTextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "text-5xl font-rbeanie text-secondary-300 bg-transparent align-middle text-center active:outline-none focus:outline-none focus:ring-0 placeholder:text-secondary-200",
        className
      )}
      {...props}
    />
  );
}

export function GoBackButton({ className, to }: RemixLinkProps) {
  return (
    <Link to={to}>
      <i className={cn("ri-arrow-left-up-line text-6xl text-link-blue hover:text-link-blue-hover", className)}></i>
    </Link>
  );
}
