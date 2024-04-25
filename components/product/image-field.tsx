import { Upload } from "lucide-react";
import Image from "next/image";
import { StateButtonNorm } from "../button/three-states-nor-button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export const ImageField = ({
  images,
  handleImageUpload,
  handleImageDelete,
  deleteButtonStatus,
  handleChangePrimary,
}: {
  images: string[];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: any;
  deleteButtonStatus: string;
  handleChangePrimary: any;
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
          <Dialog>
            <DialogTrigger asChild>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="300"
                unoptimized={true}
                src={images[0] || "/placeholder.svg"}
                width="300"
              />
            </DialogTrigger>
            <DialogContent>
              <Image
                alt="Product image"
                className="w-full rounded-md object-cover"
                width={0}
                height={0}
                unoptimized={true}
                src={images[0] || "/placeholder.svg"}
              />{" "}
              <StateButtonNorm
                status={deleteButtonStatus}
                state={{
                  idle: "Xoá ảnh",
                  error: "Lỗi",
                  done: "Đã xoá",
                }}
                onClick={() => handleImageDelete(images[0])}
              />
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-3 gap-2">
            {images
              .filter((value, index) => index !== 0)
              .map((url, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Image
                      priority={true}
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      unoptimized={true}
                      src={url || "/placeholder.svg"}
                      width="84"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <Image
                      priority={true}
                      key={index}
                      alt="Product image"
                      className=" w-full rounded-md object-cover"
                      height={0}
                      unoptimized={true}
                      src={url || "/placeholder.svg"}
                      width={0}
                    />
                    <StateButtonNorm
                      status="idle"
                      state={{
                        idle: "Đặt ảnh chính",
                        error: "Lỗi",
                        done: "Thành công",
                      }}
                      onClick={() => handleChangePrimary(url)}
                    />
                    <StateButtonNorm
                      status={deleteButtonStatus}
                      state={{
                        idle: "Xoá ảnh",
                        error: "Lỗi",
                        done: "Đã xoá",
                      }}
                      onClick={() => handleImageDelete(url)}
                    />
                  </DialogContent>
                </Dialog>
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
                onChange={handleImageUpload}
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
