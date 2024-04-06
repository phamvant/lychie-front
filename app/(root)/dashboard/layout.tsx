import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  return (
    <div>
      {React.cloneElement(props.children as React.ReactElement, { session })}
    </div>
  );
};

export default DashboardLayout;
