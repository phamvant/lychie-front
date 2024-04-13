import Link from "next/link";

import { cn } from "@/lib/utils";
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
    title: "Product",
    href: "/product",
  },
];

interface Props extends React.HTMLAttributes<HTMLElement> {
  isLogged: boolean;
}

const MainNav = async ({ className, isLogged, ...props }: Props) => {
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
              prefetch={true}
              className={`text-sm font-medium transition-colors  hover:text-primary`}
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
