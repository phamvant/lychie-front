"use client";

import { ProductImage } from "@/components/product/product-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductDto } from "./product-dto";

const ProductPage = ({ session }: any) => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const productResponse = await fetch(
          `${process.env.BACKEND_URL}/product`,
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
        setProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:px-20 flex flex-1">
      <Card className="w-full border-none">
        <CardHeader className="flex flex-row justify-between items-center mb-10">
          <CardTitle>Sản phẩm</CardTitle>
          <Link className="text-md" href={`/create`}>
            <Button>Tạo sản phẩm</Button>
          </Link>
        </CardHeader>
        <CardContent className="pr-0 lg:pr-6">
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-x-12 lg:gap-y-20">
            {products.map((product) => (
              <ProductImage
                key={product.productName}
                product={product}
                className="lg:w-[240px] w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
                isLoading={isLoading}
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
