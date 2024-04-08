import { Upload } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const ImageField = ({
  images,
  handleChange,
}: {
  images: string[];
  handleChange: any;
}) => {
  return (
    <Card
      className="overflow-hidden max-w-sm lg:max-w-xl"
      x-chunk="dashboard-07-chunk-4"
    >
      <CardHeader>
        <CardTitle>Ảnh sản phẩm</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={images[0] || "/placeholder.svg"}
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            {images
              .filter((value, index) => index !== 0)
              .map((url, index) => (
                <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="84"
                  src={url || "/placeholder.svg"}
                  width="84"
                />
              ))}

            <label
              htmlFor="fileInput"
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
            >
              <input
                hidden
                type="file"
                id="fileInput"
                multiple
                onChange={handleChange}
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
            </label>
            <span className="sr-only">Tải lên</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
