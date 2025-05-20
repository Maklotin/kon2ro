import { cn } from "~/utils/misc";

import React from "react";
import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";
import { StickyNote } from "./Stickynote";
import { Office } from "~/schema/group-office.schema";

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
      <p className="text-link-blue-100 hover:text-link-blue-200 text-5xl align-middle text-center">
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
    <div>
      <Link to={to} className="w-full h-full flex items-center justify-center">
        <i
          className={cn(
            "ri-arrow-left-up-line text-6xl text-link-blue-100 hover:text-link-blue-200",
            className
          )}
        ></i>
      </Link>
    </div>
  );
}

export function OfficeStickyNote({
  className,
  name,
  description,
  address,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & Office) {
  const officeName = name.replace(/\s+/g, "_");
  return (
    <div className="scale-75" {...props}>
      <Link to={`/office/${officeName}`}>
        <StickyNote
          title={name}
          fitText={true}
          className="hover:scale-105 transition-all duration-300 active:scale-95"
          fields={[
            {
              component: (
                <button>
                  <i className="ri-settings-3-line text-6xl text-secondary-300 hover:text-secondary-hover-100"></i>
                </button>
              ),
              x: 460,
              y: 70,
            },
            {
              component: <p>{description}</p>,
              x: 60,
              y: 175,
            },
            {
              component: (
                <i className="ri-building-line text-[20rem] text-secondary-300 text-opacity-65"></i>
              ),
              x: 120,
              y: 120,
              width: 360,
              height: 360,
            },
            {
              component: (
                <StickyNoteTextButton type="button">
                  {address}
                </StickyNoteTextButton>
              ),
              x: 120,
              y: 500,
            },
          ]}
        />
      </Link>
    </div>
  );
}
