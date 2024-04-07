import { AlbumArtwork } from "@/components/product/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
export interface Album {
  name: string;
  artist: string;
  cover: string;
}

export interface ProductDto {
  productId: string;
  productName: string;
  productDescription: string;
  productCostPrice: string;
  productPrice: string;
  productCategory: string;
  productSubCategory: string;
  productVariants: any;
  productImages: string[];
}

export const metadata: Metadata = {
  title: "Product",
  description: "Example dashboard app built using the components.",
};

const ProductPage = ({ products }: any) => {
  // console.log(products);
  const kariProducts = products as ProductDto[];
  return (
    <div className="lg:px-20 flex flex-1">
      <Card className="w-full border-none">
        <CardHeader className="flex flex-row justify-between items-center mb-10">
          <CardTitle>Sản phẩm</CardTitle>
          <Link className="text-md" href={`/create`}>
            <Button>Tạo sản phẩm</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 lg:gap-x-12 lg:gap-y-20">
            {kariProducts.map((product) => (
              <AlbumArtwork
                key={product.productName}
                product={product}
                className="w-[240px]"
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
