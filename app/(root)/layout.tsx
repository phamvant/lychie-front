"use client";

import { AppBar } from "@/components/appbar/app-bar";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

function RootLayout({ children }: Props) {
  const { data: session, status } = useSession();

  if (session == null) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <AppBar />
      <div className="pt-10 lg:pt-16 mb-20">{children}</div>
    </div>
  );
}

export default RootLayout;
