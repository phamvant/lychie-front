"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Compressor from "compressorjs";
import { Session } from "next-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  description: z.string().trim().min(1, "Description is required"),
  // sku: z.string().trim().min(1, "SKU is required").max(20),
  importPrice: z.string(),
  exportPrice: z.string(),
  // size: z.string().optional(), // Make size optional if needed
  category: z.string().trim().min(1, "Category is required"),
  subCategory: z.string().optional(), // Make subcategory optional if needed
  // status: z.enum(["draft", "published", "archived"]),
});

const CreateProductPage = ({ session }: { session: Session }) => {
  const [status, setStatus] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setIsFetching((prev: boolean) => !prev);
    console.log(process.env.BACKEND_URL);

    const formData = new FormData();
    const a = JSON.stringify(values);
    const b = { formData, a };
    selectedFiles.forEach((file) => formData.append("images", file));

    const imageUpload = fetch("http://localhost:8080/product/updateImage", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    const register = fetch("http://localhost:8080/product/create", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    try {
      const [registerResponse, imageUploadResponse] = await Promise.all([
        register,
        imageUpload,
      ]);

      if (!registerResponse.ok) {
        setStatus((prev) => !prev);
        setIsFetching((prev) => !prev);
        // Handle registration request error
        console.error("Error registering user:", await registerResponse.text());
        return;
      }

      const registerData = await registerResponse.json();

      if (!imageUploadResponse.ok) {
        // Handle image upload request error
        console.error(
          "Error uploading images:",
          await imageUploadResponse.text()
        );
      } else {
        const imageUploadData = await imageUploadResponse.json();
        // Handle successful registration and image upload (e.g., update state, redirect)
        console.log("Registration successful:", registerData);
        console.log("Images uploaded successfully:", imageUploadData);
      }
    } catch (error) {
      console.error("Error during concurrent requests:", error);
      // Handle other potential errors
    } finally {
      setIsFetching((prev) => !prev);
    }

    // if (!res.ok) {
    //   setStatus((prev: boolean) => !prev);
    //   setIsFetching((prev: boolean) => !prev);
    //   return;
    // }
    // setIsFetching((prev: boolean) => !prev);

    // const response = await res.json();
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>名前</FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              type="text"
                              className="w-full"
                              placeholder="Váy ngắn cũn cỡn"
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
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>商品記述</FormLabel>
                          <FormControl>
                            <Input
                              id="description"
                              type="text"
                              className="w-full"
                              placeholder="Váy ngắn cũn cỡn"
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
                <CardTitle>数量</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>輸入値</TableHead>
                      <TableHead>輸出値</TableHead>
                      <TableHead className="w-[100px]">Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name="importPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  className="w-full"
                                  placeholder="20k"
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
                          name="exportPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="w-full"
                                  placeholder="20k"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type="single"
                          defaultValue="s"
                          variant="outline"
                        >
                          <ToggleGroupItem value="s">S</ToggleGroupItem>
                          <ToggleGroupItem value="m">M</ToggleGroupItem>
                          <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              {/* <Button size="sm" variant="ghost" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button> */}
            </Card>
            <Card x-chunk="dashboard-07-chunk-2" className="bg-white">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <FormField
                      control={form.control}
                      name="category"
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
                              <SelectItem value="Student">Student</SelectItem>
                              <SelectItem value="Engineer">Engineer</SelectItem>
                              <SelectItem value="Teacher">Teacher</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory (optional)</Label>

                    <FormField
                      control={form.control}
                      name="subCategory"
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
                              <SelectItem value="t-shirts">T-Shirts</SelectItem>
                              <SelectItem value="hoodies">Hoodies</SelectItem>
                              <SelectItem value="sweatshirts">
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
                <CardTitle>Save Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" type="submit">
                  Save Product
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
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={previewUrls[0] || "/placeholder.svg"}
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {previewUrls
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

export default CreateProductPage;
