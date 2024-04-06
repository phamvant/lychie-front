import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ProductLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  console.log(session.backendTokens.accessToken);

  return (
    <div className="flex content-center justify-around pt-8 ">
      {React.cloneElement(props.children as React.ReactElement, { session })}
    </div>
  );
};

export default ProductLayout;
