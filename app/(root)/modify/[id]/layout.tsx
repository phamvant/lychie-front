"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ModifyProductPage from "./page";

// export const metadata: Metadata = {
//   title: "Create Product",
//   description: "Example dashboard app built using the components.",
// };

const ModifyProductLayout = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>Loading</>;
  }

  if (!session || !session.user) {
    return redirect("/");
  }

  return (
    <div className="flex content-center justify-around pt-8 ">
      <ModifyProductPage session={session} productId={params.id} />
    </div>
  );
};

export default ModifyProductLayout;
