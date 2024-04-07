import Image from "next/image";

import { cn } from "@/lib/utils";

import { ProductDto } from "@/app/(root)/product/page";
import Link from "next/link";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductDto;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  product,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div
      className={cn("space-y-3 flex flex-col rounded-xl p-2", className)}
      {...props}
    >
      <Image
        src={product.productImages[0]}
        alt={product.productName}
        width={width}
        height={height}
        className={cn(
          "h-auto w-auto object-cover transition-all hover:scale-105 rounded-2xl aspect-square shadow-xl mb-4"
        )}
      />
      <Link href={`/modify/${product.productId}`}>
        <div className="flex flex-col gap-2">
          <h3 className="leading-2 text-md text-gray-600 mb-2 min-h-[48px]">
            {product.productName}
          </h3>
          <div>
            <p className="text-sm font-bold">Giá: {product.productPrice}đ</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
