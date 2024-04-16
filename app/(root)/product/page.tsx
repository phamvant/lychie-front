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
import { ProductDto } from "../../../models/product-dto";

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

const ProductPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <>Error...</>;
  }

  const productData = (await fetchProductsData(session)) as ProductDto[];

  return (
    <div className="lg:px-20 flex flex-1">
      <Card className="w-full border-none">
        <CardHeader className="flex flex-row justify-between items-center mb-10">
          <CardTitle>Sản phẩm</CardTitle>
          <Link className="text-md" href={`/product/create`}>
            <Button>Tạo sản phẩm</Button>
          </Link>
        </CardHeader>
        <CardContent className="pr-0 lg:pr-6">
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-x-12 lg:gap-y-20">
            {productData.map((product) => (
              <ProductImage
                key={product.productId}
                product={product}
                className="lg:w-[240px] w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductPage;
