import Image from "next/image";

import { cn } from "@/lib/utils";

import { ProductDto } from "@/models/product-dto";
import { CheckCircle2 } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductDto;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export async function ProductImage({
  product,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn("space-y-3 flex flex-col rounded-xl p-2", className)}
      {...props}
    >
      <Image
        src={product.productImages[0]}
        alt={product.productCode}
        width={width}
        priority={true}
        height={height}
        className={cn(
          "h-auto w-auto object-cover transition-all hover:scale-105 rounded-2xl aspect-square shadow-xl mb-4"
        )}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-md text-gray-600 mb-2">#{product.productCode}</h3>
          {product.productIsPosted ? (
            <CheckCircle2 className="rounded-full text-green-400" />
          ) : (
            <></>
          )}
        </div>

        <div>
          <p className="text-sm font-bold">Giá: {product.productPrice}đ</p>
        </div>
      </div>
    </div>
  );
}
