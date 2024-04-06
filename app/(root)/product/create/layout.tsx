import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import CreateProductPage from "./page";

type Props = {
  children: React.ReactNode;
};

const CreateProductLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  return (
    <div className="flex content-center justify-around pt-8 ">
      <CreateProductPage session={session} />
    </div>
  );
};

export default CreateProductLayout;
