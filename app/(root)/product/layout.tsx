import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchProductsData = async (session: Session) => {
  try {
    const productResponse = await fetch(`${process.env.BACKEND_URL}/product`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!productResponse.ok) {
      throw new Error(
        `Failed to fetch products: ${productResponse.statusText}`
      );
    }

    const products = await productResponse.json();
    return products;
  } catch (e) {
    return false;
  }
};

export const metadata: Metadata = {
  title: "Create Product",
  description: "Example dashboard app built using the components.",
};

const ProductLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  const ret = await fetchProductsData(session);

  if (!ret) {
    return redirect("/");
  }

  return (
    <div className="flex content-center justify-around pt-8 ">{children}</div>
  );
};

export default ProductLayout;
