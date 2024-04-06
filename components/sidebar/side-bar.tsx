"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navBarContent } from "../appbar/main-nav";
import { Separator } from "../ui/separator";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [activePage, setActivePage] = useState(0);

  const toggleSidebar = () => setSidebar(!sidebar);

  const active = (index: number) => {
    toggleSidebar();
    setActivePage(index);
  };

  return (
    <>
      <Menu
        onClick={toggleSidebar}
        className="cursor-pointer xl:hidden rounded-2xl"
        size={30}
        strokeWidth={1}
      />

      <div>
        <div
          className={`${
            sidebar ? "left-0" : "-left-[320px]"
          } w-[320px] z-50 h-screen top-0 fixed bg-white duration-500`}
        >
          <div className="p-4 flex flex-row justify-between items-center pb-0">
            <Link href={"/"}>
              <Image src={"/rocket.svg"} alt={""} width={40} height={40} />
            </Link>
            <Link
              href={"/"}
              className="text-xl font-black text-blue-500 border-blue-500 "
            >
              ChaseYourDream
            </Link>
            <X color="grey" strokeWidth={1} size={30} onClick={toggleSidebar} />
          </div>
          <Separator className="my-4" />
          <nav className="p-4">
            <ul className="w-full">
              {navBarContent.map((item, index) => {
                return (
                  <li key={index} className="nav-text px-4 py-3">
                    <Link
                      href={item.href}
                      onClick={() => active(index)}
                      className={`font-bold text-slate-600 ${
                        activePage === index ? "text-blue-600" : ""
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div
          className={` ${
            sidebar ? "opacity-50 block" : "hidden"
          } "z-50 fixed left-0 w-screen h-screen top-0 bg-black transition-all duration-500"`}
          onClick={toggleSidebar}
        />
      </div>
    </>
  );
}

export default Sidebar;
