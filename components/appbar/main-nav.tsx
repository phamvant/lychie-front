"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useContext } from "react";
import { ProductContext } from "../Providers";
export const navBarContent = [
  {
    title: "Landing",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/",
  },
  {
    title: "Product",
    href: "/product?page=1",
  },
  {
    title: "Discount",
    href: "/product/discount",
  },
  {
    title: "Cart",
    href: "/cart",
  },
];

interface Props extends React.HTMLAttributes<HTMLElement> {
  isLogged: boolean;
}

const MainNav = ({ className, isLogged, ...props }: Props) => {
  const { cartNumber } = useContext(ProductContext);
  const [orderAmount, setOrderAmount] = cartNumber;

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navBarContent.map((prop, index) => {
        if (prop.title == "Cart") {
          return (
            <div className="relative" key={index}>
              <div
                className="absolute w-6 h-6 text-center text-xs inline-flex items-center justify-center
              text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-6 dark:border-gray-900"
              >
                {orderAmount}
              </div>
              <Link
                // key={index}
                href={prop.href}
                prefetch={true}
                className={`text-sm font-medium transition-colors hover:text-primary`}
              >
                {prop.title}
              </Link>
            </div>
          );
        } else if (prop.title !== (isLogged ? "" : "Product")) {
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
