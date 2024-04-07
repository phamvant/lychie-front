"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Upload } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Compressor from "compressorjs";
import _ from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productVariantSchema = {
  size: z.array(z.string()),
  color: z.array(z.string()).optional(),
  material: z.string().optional(),
};

const productSchema = z.object({
  productName: z.string().trim().min(1, "Name is required").max(255),
  productDescription: z.string().trim().min(1, "Description is required"),
  productCostPrice: z.string().min(1, "Price is required"),
  productPrice: z.string().min(1, "Price is required"),
  productCategory: z.string().trim().min(1, "Category is required"),
  productSubCategory: z.string().optional(), // Make subcategory optional if needed
  // productVariants: z
  //   .object(productVariantSchema)
  //   .default({ size: ["M"], color: ["red"] }),
});

const ModifyProductPage = ({ session, product }: any) => {
  const [status, setStatus] = useState<string>("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [size, setSize] = useState<string[]>([]);

  const onSizeChange = (values: string[]) => {
    setSize(values);
  };

  const productImages = product.productImages as string[];

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: product.productName,
      productDescription: product.productDescription,
      productCostPrice: product.productCostPrice,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      productSubCategory: product.productSubCategory,
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setStatus("fetching");
    console.log(process.env.BACKEND_URL);

    try {
      //----------------GET_URL----------------//
      const uploadUrlResponse = await fetch(
        process.env.BACKEND_URL +
          `/s3/image-upload-url?productName=${_.kebabCase(
            values.productName
          )}&volume=${previewUrls.length}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }
      );

      if (!uploadUrlResponse.ok) {
        setStatus("failed");
        // Handle registration request error
        console.error("Error getting url:", await uploadUrlResponse.text());
        return;
      }

      //----------------ConvertURL----------------//

      const uploadUrlResponseArray =
        (await uploadUrlResponse.json()) as string[];

      const productImages = uploadUrlResponseArray.reduce((prev, current) => {
        prev.push(current.split("?")[0]);
        return prev;
      }, [] as string[]);

      console.log({ ...values, productImages, productVariant: { size: size } });

      //----------------ProductRegiter----------------//

      const registerResponse = await fetch(
        process.env.BACKEND_URL + "/product/create",
        {
          method: "POST",
          body: JSON.stringify({ ...values, productImages }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }
      );

      if (!registerResponse.ok) {
        setStatus("failed");
        // Handle registration request error
        console.error(
          "Error registering product:",
          await registerResponse.text()
        );
        return;
      }

      //----------------Upload_Image----------------//
      for (let i = 0; i < uploadUrlResponseArray.length; i++) {
        const uploadImageResponse = await fetch(uploadUrlResponseArray[i], {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: selectedFiles[i],
        });

        if (!uploadImageResponse.ok) {
          setStatus("failed");
          // Handle registration request error
          console.error(
            "Error uploading image :",
            await registerResponse.text()
          );
          return;
        }
      }

      setStatus("success");
    } catch (error) {
      console.error("Error during concurrent requests:", error);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedFiles = Array.from(event.target.files!) as File[]; // Type assertion for FileList

    newSelectedFiles.map((file) => {
      new Compressor(file, {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          setSelectedFiles((prevFiles) => {
            prevFiles.push(compressedResult as File);
            return prevFiles;
          });
        },
      });
    });

    setSelectedFiles((prevFiles) => [...prevFiles, ...newSelectedFiles] as []);

    const newPreviewUrls = newSelectedFiles.map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls] as []);
  };

  const removeImage = (index: number) => {
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles.splice(index, 1);
    setSelectedFiles(updatedSelectedFiles);

    const updatedPreviewUrls = [...previewUrls];
    updatedPreviewUrls.splice(index, 1);
    setPreviewUrls(updatedPreviewUrls);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8 px-36">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0" className="bg-white">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="productName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên</FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              type="text"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="productDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Miêu tả</FormLabel>
                          <FormControl>
                            <Input
                              id="description"
                              type="text"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1" className="bg-white">
              <CardHeader>
                <CardTitle>Chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="p-0">Giá nhập</TableHead>
                      <TableHead>Giá bán</TableHead>
                      <TableHead className="w-[100px]">Kích cỡ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="pl-0">
                        <FormField
                          control={form.control}
                          name="productCostPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  className="w-full"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-1" className="sr-only">
                          Price
                        </Label>
                        <FormField
                          control={form.control}
                          name="productPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="w-full"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type="multiple"
                          variant="outline"
                          onValueChange={onSizeChange}
                          defaultValue={product.productVariants.size}
                        >
                          <ToggleGroupItem value="XS">XS</ToggleGroupItem>
                          <ToggleGroupItem value="S">S</ToggleGroupItem>
                          <ToggleGroupItem value="M">M</ToggleGroupItem>
                          <ToggleGroupItem value="L">L</ToggleGroupItem>
                          <ToggleGroupItem value="XL">XL</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2" className="bg-white">
              <CardHeader>
                <CardTitle>Phân loại sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Phân loại</Label>
                    <FormField
                      control={form.control}
                      name="productCategory"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Clothes">Clothes</SelectItem>
                              <SelectItem value="Dress">Dress</SelectItem>
                              <SelectItem value="Bag">Bag</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Phân loại chi tiết</Label>

                    <FormField
                      control={form.control}
                      name="productSubCategory"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="T-shirts">T-Shirts</SelectItem>
                              <SelectItem value="Hoodies">Hoodies</SelectItem>
                              <SelectItem value="Sweatshirts">
                                Sweatshirts
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5" className="bg-white">
              <CardHeader>
                <CardTitle>Lưu sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  disabled={status === "fetching"}
                  variant={
                    (status === "success" ? true : false)
                      ? "secondary"
                      : "default"
                  }
                  size="sm"
                  type="submit"
                >
                  {status === "fetching" ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </>
                  ) : status === "success" ? (
                    <span className="text-green-500">Saved!</span>
                  ) : (
                    <>Lưu sản phẩm</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            {/* <Card x-chunk="dashboard-07-chunk-3" className="bg-white">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Ảnh sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={product.productImages[0] || "/placeholder.svg"}
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {productImages
                      .filter((value, index) => index !== 0)
                      .map((url, index) => (
                        <Image
                          key={index}
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
                    <span className="sr-only">Upload</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ModifyProductPage;
