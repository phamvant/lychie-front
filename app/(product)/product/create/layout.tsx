import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CreateProductPage from "./page";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Example dashboard app built using the components.",
};

const CreateProductLayout = async () => {
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
