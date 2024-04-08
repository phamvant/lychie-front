"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CreateProductPage from "./page";

// export const metadata: Metadata = {
//   title: "Create Product",
//   description: "Example dashboard app built using the components.",
// };

const CreateProductLayout = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
