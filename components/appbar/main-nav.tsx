"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useState } from "react";
export const navBarContent = [
  {
    title: "Overview",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Editor",
    href: "/editor",
  },
];

interface Props extends React.HTMLAttributes<HTMLElement> {
  isLogged: boolean;
}

const MainNav = ({ className, isLogged, ...props }: Props) => {
  const [activePage, setActivePage] = useState(0);

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navBarContent.map((prop, index) => {
        if (prop.title !== (isLogged ? "" : "Editor")) {
          return (
            <Link
              key={index}
              href={prop.href}
              onClick={() => setActivePage(index)}
              className={`text-sm font-medium transition-colors ${
                activePage === index ? "" : "text-muted-foreground"
              } hover:text-primary`}
            >
              {prop.title}
            </Link>
          );
        }
      })}
    </nav>
  );
};

export default MainNav;
