"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { SaveButton } from "@/components/product/button-save";
import { ImageField } from "@/components/product/image-field";
import { ProductCategory } from "@/components/product/product-category";
import { ProductDetails } from "@/components/product/product-details";
import { ProductVariant } from "@/components/product/product-variant";
import { zodResolver } from "@hookform/resolvers/zod";
import Compressor from "compressorjs";
import _ from "lodash";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "../../create/page";
import { ProductDto } from "../../product/page";

const initialProduct: ProductDto = {
  productId: "",
  productName: "",
  productDescription: "",
  productCostPrice: "",
  productPrice: "",
  productCategory: "",
  productSubCategory: "",
  productVariants: {},
  productImages: [""],
  productMemo: "",
};

const ModifyProductPage = ({
  session,
  productId,
}: {
  session: Session;
  productId: string;
}) => {
  const [status, setStatus] = useState<string>("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [product, setProduct] = useState<ProductDto>(initialProduct);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: product.productName,
      productDescription: product.productDescription,
      productCostPrice: product.productCostPrice,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      productSubCategory: product.productSubCategory,
      productMemo: product.productMemo,
    },
  });

  useEffect(() => {
    setIsLoading(true);
    const getProduct = async () => {
      try {
        const response = await fetch(
          process.env.BACKEND_URL + `/product/${productId}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${session?.backendTokens.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const product = await response.json();
        setProduct(product);
        form.setValue("productName", product.productName);
        form.setValue("productDescription", product.productDescription || ""); // Set empty string if optional
        form.setValue("productCostPrice", product.productCostPrice || 0); // Set 0 if optional (adjust for number type)
        form.setValue("productPrice", product.productPrice || 0); // Set 0 if optional (adjust for number type)
        form.setValue("productCategory", product.productCategory);
        form.setValue("productSubCategory", product.productSubCategory);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

      console.log({
        ...values,
        productImages,
      });

      //----------------ProductRegiter----------------//

      const registerResponse = await fetch(
        process.env.BACKEND_URL + "/product/create",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            productImages,
          }),
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
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:px-36">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8 ">
            <ProductDetails form={form} />
            <ProductVariant form={form} />
            <ProductCategory form={form} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <ImageField
              images={product.productImages}
              handleChange={handleChange}
            />
            <Card
              x-chunk="dashboard-07-chunk-5"
              className="bg-white max-w-sm lg:max-w-xl"
            >
              <CardHeader>
                <CardTitle>Lưu sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <SaveButton status={status} />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ModifyProductPage;
