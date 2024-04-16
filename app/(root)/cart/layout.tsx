import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const CartPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  return (
    <div className="flex content-center justify-around pt-8 ">{children}</div>
  );
};

export default CartPageLayout;
