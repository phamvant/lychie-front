"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Dashboard from "./page";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// };

const DashboardLayout = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return redirect("/");
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardLayout;
