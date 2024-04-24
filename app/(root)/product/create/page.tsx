"use client";
import { Form } from "@/components/ui/form";

import { ProductContext } from "@/components/Providers";
import { StateButton } from "@/components/button/three-states-button";
import { ImageField } from "@/components/product/image-field";
import { ProductDetails } from "@/components/product/product-details";
import { ProductPrice } from "@/components/product/product-price";
import { ProductVariant } from "@/components/product/product-variant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productSchema } from "@/lib/zod/product-schema";
import { ProductDto } from "@/models/product-dto";
import { UserDto } from "@/models/user-dto";
import { codeGenerate } from "@/utils/product-code-generate";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateProductPage = ({ session }: any) => {
  const { categories } = useContext(ProductContext);
  const [status, setStatus] = useState<string>("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [productAmount, setProductAmount] = useState<number>(0);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userResponse = await fetch(
          `${process.env.BACKEND_URL}/user/${session?.user.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = (await userResponse.json()) as UserDto;
        setProductAmount(userData.userProductsAmount + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUserData();
  }, []);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      productCode: "",
      productDescription: "",
      productCostPrice: 0,
      productPrice: 0,
      productFinalPrice: 0,
      productDiscountType: "none",
      productDiscountAmount: 0,
      productCategory: "",
      productSubCategory: "",
      productMemo: "",
      productIsPosted: false,
    },
  });

  const onCategoryChange = () => {
    const code = codeGenerate(
      form.getValues("productCategory"),
      form.getValues("productSubCategory") as string,
      categories[0]
    ).toString();

    form.setValue("productCode", code + productAmount);
  };

  const getImageUploadUrl = async (
    productAmount: z.infer<typeof productSchema>
  ) => {
    const uploadUrlResponse = await fetch(
      `${process.env.BACKEND_URL}/s3/image-upload-url?productCode=${_.kebabCase(
        productAmount.productCode
      )}&volume=${previewUrls.length}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
      }
    );

    return uploadUrlResponse;
  };

  const createProduct = async (queryObj: ProductDto) => {
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

    return registerResponse;
  };

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    setStatus("fetching");
    try {
      //----------------GET_URL----------------//

      const uploadUrlResponse = await getImageUploadUrl(values);

      if (!uploadUrlResponse.ok) {
        setStatus("failed");
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
      } as ProductDto;

      //----------------ProductRegiter----------------//

      const createProductResponse = await createProduct(queryObj);

      if (!createProductResponse.ok) {
        setStatus("failed");
        // Handle registration request error
        console.error(
          "Error registering product:",
          await createProductResponse.text()
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
            await createProductResponse.text()
          );
          return;
        }
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.error("Error during concurrent requests:", error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedFiles = Array.from(event.target.files!) as File[];

    setSelectedFiles((prevFiles) => [...prevFiles, ...newSelectedFiles] as []);

    const newPreviewUrls = newSelectedFiles.map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls] as []);
  };

  // const removeImage = (index: number) => {
  //   const updatedSelectedFiles = [...selectedFiles];
  //   updatedSelectedFiles.splice(index, 1);
  //   setSelectedFiles(updatedSelectedFiles);

  //   const updatedPreviewUrls = [...previewUrls];
  //   updatedPreviewUrls.splice(index, 1);
  //   setPreviewUrls(updatedPreviewUrls);
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:px-36">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
            <ProductDetails form={form} />
            <ProductVariant form={form} onCategoryChange={onCategoryChange} />
            <ProductPrice form={form} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <ImageField
              images={previewUrls}
              handleImageUpload={handleImageUpload}
            />
            <Card
              x-chunk="dashboard-07-chunk-5"
              className="bg-white max-w-sm lg:max-w-xl"
            >
              <CardHeader>
                <CardTitle>Lưu sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <StateButton
                  status={status}
                  state={{
                    done: "Đã lưu",
                    error: "Lỗi lưu sản phẩm",
                    idle: "Lưu sảm phẩm",
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductPage;
