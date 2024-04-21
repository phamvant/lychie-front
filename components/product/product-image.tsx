"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { ProductDto } from "@/models/product-dto";
import { addThousandSeparator } from "@/utils/thousands-separator";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductDto;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function ProductImage({
  product,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: Props) {
  const { data: session } = useSession();

  const onSubmit = async (e: any) => {
    try {
      const modifyProductResponse = await fetch(
        process.env.BACKEND_URL + `/product/modify/${product.productId}`,
        {
          method: "PUT",
          body: JSON.stringify({ productIsPosted: e }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      if (!modifyProductResponse.ok) {
        // Handle registration request error
        console.error(
          "Error modify product:",
          await modifyProductResponse.text()
        );

        throw new Error();
      }
    } catch (error) {
      console.error("Error during concurrent requests:", error);
    }
  };

  return (
    <div
      className={cn("space-y-3 flex flex-col rounded-xl p-2", className)}
      {...props}
    >
      <Link prefetch={true} href={`product/${product.productId}`}>
        <Image
          src={product.productImages[0] || "/placeholder.svg"}
          alt={product.productCode}
          width={width}
          unoptimized={true}
          priority={true}
          height={height}
          className={cn(
            "object-cover transition-all hover:scale-105 rounded-2xl aspect-square shadow-xl mb-4 w-full"
          )}
        />
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-md text-gray-600 mb-2">#{product.productCode}</h3>
          <Checkbox
            className="rounded-full w-5 h-5 data-[state=checked]:bg-green-600 data-[state=checked]:border-0"
            defaultChecked={product.productIsPosted}
            onCheckedChange={(e: boolean) => {
              onSubmit(e);
              product.productIsPosted = e;
            }}
          />
        </div>

        <div>
          <p className="text-sm font-bold">
            Giá: {addThousandSeparator(product.productPrice)}đ
          </p>
        </div>
      </div>
    </div>
  );
}
