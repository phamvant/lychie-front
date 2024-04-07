import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { ProductDto } from "../../product/page";
import ModifyProductPage from "./page";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Create Product",
  description: "Example dashboard app built using the components.",
};

const getProduct = async (productId: string, session: Session) => {
  const response = await fetch(
    process.env.BACKEND_URL + `/product/${productId}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const product = await response.json();
  return product as ProductDto;
};

const ModifyProductLayout = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  const product = await getProduct(params.id, session);

  return (
    <div className="flex content-center justify-around pt-8 ">
      <ModifyProductPage session={session} product={product} />
    </div>
  );
};

export default ModifyProductLayout;
