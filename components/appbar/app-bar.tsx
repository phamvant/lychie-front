"use client";
import { useSession } from "next-auth/react";
import Sidebar from "../sidebar/side-bar";
import AuthButton from "./auth-button/auth-button";
import MainNav from "./main-nav";
import Search from "./search";

export function AppBar() {
  const { data: session, status } = useSession();

  return (
    <div className="z-50 border-b fixed top-0 w-screen backdrop-filter backdrop-blur-xl bg-red/50 lg:px-80">
      <div className="flex h-14 lg:h-20 items-center px-4 flex-row justify-between">
        <div className="flex flex-row items-center gap-2 lg:gap-4">
          <Sidebar />
        </div>
        <div className="hidden xl:block">
          <MainNav
            isLogged={session ? true : false}
            className={`mx-6 ${session ? "" : "ml-44"}`}
          />
        </div>
        <div className="ml flex items-center space-x-8">
          <Search
            className={`hidden md:block lg:block sm:w-[100px] lg:w-[280px] h-10`}
          />
          <AuthButton session={session} />
        </div>
      </div>
    </div>
  );
}
