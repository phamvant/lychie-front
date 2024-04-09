"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ProductPage from "./page";

// export const metadata: Metadata = {
//   title: "Create Product",
//   description: "Example dashboard app built using the components.",
// };

const ProductLayout = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return redirect("/");
  }

  return (
    <div className="flex content-center justify-around pt-8 ">
      <ProductPage session={session} />
    </div>
  );
};

export default ProductLayout;
