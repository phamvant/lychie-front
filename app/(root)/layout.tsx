import { AppBar } from "@/components/appbar/app-bar";
import { authOptions } from "@/lib/auth";
import { ProductDto } from "@/models/product-dto";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

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

async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const productData = (await fetchProductsData(session)) as ProductDto[];

  return (
    <div>
      <AppBar />
      <div className="pt-10 lg:pt-16 mb-20">{children}</div>
    </div>
  );
}

export default RootLayout;
