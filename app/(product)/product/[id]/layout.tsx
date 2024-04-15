import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ModifyProductPage from "./page";

const ModifyProductLayout = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const fetchProductsData = async (session: Session) => {
    try {
      const productResponse = await fetch(
        `${process.env.BACKEND_URL}/product/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
          cache: "force-cache",
        }
      );

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

  if (!session || !session.user) {
    return redirect("/");
  }

  await fetchProductsData(session);

  return (
    <div>
      <ModifyProductPage session={session} productId={params.id} />
    </div>
  );
};

export default ModifyProductLayout;
