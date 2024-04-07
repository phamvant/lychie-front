import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import ProductPage from "./page";

type Props = {
  children: React.ReactNode;
};

const getProductData = async (session: Session) => {
  const ret = await fetch(process.env.BACKEND_URL + "/product", {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.backendTokens.accessToken}`,
    },
  });

  const products = await ret.json();

  return products;
};

const ProductLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  console.log(session);

  const products = await getProductData(session);

  // console.log(products);

  return (
    <div className="flex content-center justify-around pt-8 ">
      {/* {React.cloneElement(props.children as React.ReactElement, { products })} */}
      <ProductPage products={products} />
    </div>
  );
};

export default ProductLayout;
