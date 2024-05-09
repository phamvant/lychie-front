import { ProductImage } from "@/components/product/product-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductDto } from "../../../models/product-dto";
import { ProductPagination } from "@/components/product/product-paging";

const fetchProductsData = async (session: Session, page: number) => {
  try {
    const productResponse = await fetch(
      `${process.env.BACKEND_URL}/product/?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
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

export default async function ProductPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const session = await getServerSession(authOptions);
  const currentPage = Number(searchParams?.page) || 1;

  if (!session) {
    return redirect("/");
  }

  const productData = (await fetchProductsData(
    session,
    currentPage
  )) as ProductDto[];

  return (
    <div className="lg:px-20 flex flex-1">
      <Card className="w-full border-none">
        <CardHeader className="flex flex-row justify-between items-center mb-10">
          <CardTitle>Sản phẩm</CardTitle>
          <ProductPagination
            currentPage={currentPage}
            isLastPage={productData.length < 8 ? true : false}
          />
          <Link className="text-md" href={`/product/create`}>
            <Button>Tạo sản phẩm</Button>
          </Link>
        </CardHeader>
        <CardContent className="pr-0 lg:pr-6">
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-20">
            {productData.map((product) => (
              <ProductImage
                key={product.productId}
                product={product}
                className="lg:w-[240px] md:w-[200px] w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
