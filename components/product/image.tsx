import Image from "next/image";

import { cn } from "@/lib/utils";

import { Album } from "./data/albums";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  album,
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
        src={album.cover}
        alt={album.name}
        width={width}
        height={height}
        className={cn(
          "h-auto w-auto object-cover transition-all hover:scale-105 rounded-2xl aspect-square shadow-xl"
        )}
      />
      <div className="flex flex-col gap-2">
        <h3 className="leading-none text-xl text-gray-700">{album.name}</h3>
        <p className="text-md text-muted-foreground ">$50</p>
        <p className="text-md text-muted-foreground ">Stock: 50</p>
      </div>
    </div>
  );
}
