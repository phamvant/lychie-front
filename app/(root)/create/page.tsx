"use client";
import { Form } from "@/components/ui/form";

import { SaveButton } from "@/components/product/button-save";
import { ImageField } from "@/components/product/image-field";
import { ProductDetails } from "@/components/product/product-details";
import { ProductPrice } from "@/components/product/product-price";
import { ProductVariant } from "@/components/product/product-variant";
import { zodResolver } from "@hookform/resolvers/zod";
import Compressor from "compressorjs";
import _ from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const productVariantSchema = {
  size: z.array(z.string()),
  color: z.array(z.string()),
  material: z.string().optional(),
};

const productSchema = z
  .object({
    productName: z.string().trim().min(1, "Name is required").max(255),
    productDescription: z.string().trim().min(1, "Description is required"),
    productCostPrice: z.coerce.number().min(1, "Price is required"),
    productPrice: z.coerce.number().min(1, "Price is required"),
    productFinalPrice: z.coerce.number(),
    productDiscountType: z.string(),
    productDiscountAmount: z.coerce.number().optional(),
    productCategory: z.string().trim().min(1, "Category is required"),
    productSubCategory: z.string().optional(),
    productMemo: z.string().optional(),
    productVariants: z.object(productVariantSchema),
  })
  .refine((schema) => {
    return !(
      (schema.productDiscountType === "none" &&
        schema.productDiscountAmount !== 0) ||
      (schema.productDiscountType !== "none" &&
        schema.productDiscountAmount === 0)
    );
  }, "Discount Error");

const CreateProductPage = ({ session }: any) => {
  const [status, setStatus] = useState<string>("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      productCostPrice: 0,
      productPrice: 0,
      productFinalPrice: 0,
      productDiscountType: "none",
      productDiscountAmount: 0,
      productCategory: "",
      productSubCategory: "",
      productMemo: "",
      // productVariants: { size: [], color: [] },
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setStatus("fetching");
    console.log(values);
    try {
      //----------------GET_URL----------------//
      const uploadUrlResponse = await fetch(
        `${
          process.env.BACKEND_URL
        }/s3/image-upload-url?productName=${_.kebabCase(
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

      const queryObj = {
        ...values,
        productImages,
      };

      console.log(queryObj);

      //----------------ProductRegiter----------------//

      const registerResponse = await fetch(
        process.env.BACKEND_URL + "/product/create",
        {
          method: "POST",
          body: JSON.stringify(queryObj),
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

        throw new Error();
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
      () => toast("Product has been created");
    } catch (error) {
      setStatus("error");
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
            <ProductPrice form={form} />
            <ProductVariant form={form} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <ImageField images={previewUrls} handleChange={handleChange} />
            <SaveButton status={status} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductPage;
