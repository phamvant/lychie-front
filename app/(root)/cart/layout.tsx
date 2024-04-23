import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getCartData = async (session: Session) => {
  const res = await fetch(`${process.env.BACKEND_URL}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.backendTokens.accessToken}`,
    },
    cache: "no-store",
  });

  const products = await res.json();
  return products;
};

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
