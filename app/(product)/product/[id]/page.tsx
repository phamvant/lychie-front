"use client";
import { Form } from "@/components/ui/form";

import { StateButton } from "@/components/button/three-states-button";
import { AddToCardButton } from "@/components/product/add-cart-button";
import { ImageField } from "@/components/product/image-field";
import { ProductDetails } from "@/components/product/product-details";
import { ProductPrice } from "@/components/product/product-price";
import { ProductVariant } from "@/components/product/product-variant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productSchema } from "@/lib/zod/product-schema";
import { getChangedFields } from "@/utils/get-changed-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductDto } from "../../../../models/product-dto";

const initialProduct: ProductDto = {
  productId: "",
  productName: "",
  productCode: "",
  productDescription: "",
  productCostPrice: 0,
  productPrice: 0,
  productFinalPrice: 0,
  productDiscountType: "",
  productDiscountAmount: 0,
  productCategory: "",
  productSubCategory: "",
  productVariants: {},
  productImages: [""],
  productMemo: "",
  productIsPosted: false,
};

const ModifyProductPage = ({ session, productId, products }: any) => {
  const [status, setStatus] = useState<string>("idle");
  const [product, setProduct] = useState<ProductDto>(initialProduct);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: product.productName,
      productCode: product.productCode,
      productDescription: product.productDescription,
      productCostPrice: product.productCostPrice,
      productPrice: product.productPrice,
      productFinalPrice: product.productFinalPrice,
      productDiscountType: product.productDiscountType,
      productDiscountAmount: product.productDiscountAmount,
      productCategory: product.productCategory,
      productSubCategory: product.productSubCategory,
      productMemo: product.productMemo,
      productVariants: product.productVariants,
      productIsPosted: product.productIsPosted,
    },
  });

  useEffect(() => {
    setIsLoading(true);
    const getProduct = async () => {
      try {
        const product = products.find(
          (product: any) => product.productId === productId
        );

        if (!product) {
          throw new Error();
        }

        setProduct(product);
        form.setValue("productName", product.productName);
        form.setValue("productCode", product.productCode);
        form.setValue("productDescription", product.productDescription || ""); // Set empty string if optional
        form.setValue("productCostPrice", product.productCostPrice || 0); // Set 0 if optional (adjust for number type)
        form.setValue("productPrice", product.productPrice || 0); // Set 0 if optional (adjust for number type)
        form.setValue("productFinalPrice", product.productFinalPrice);
        form.setValue("productDiscountType", product.productDiscountType);
        form.setValue("productDiscountAmount", product.productDiscountAmount);
        form.setValue("productCategory", product.productCategory);
        form.setValue("productSubCategory", product.productSubCategory);
        form.setValue("productVariants", product.productVariants);
        form.setValue("productMemo", product.productMemo);
        form.setValue("productIsPosted", product.productIsPosted);
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const modifyObject = async (queryObj: Record<string, any>) => {
    const registerResponse = await fetch(
      process.env.BACKEND_URL + `/product/modify/${productId}`,
      {
        method: "PUT",
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
    const { productId, productImages, ...submitField } = product;

    const queryObj = getChangedFields(submitField, values);
    console.log(queryObj);

    try {
      const modifyProductResponse = await modifyObject(queryObj);

      if (!modifyProductResponse.ok) {
        setStatus("failed");
        // Handle registration request error
        console.error(
          "Error modify product:",
          await modifyProductResponse.text()
        );

        throw new Error();
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.error("Error during concurrent requests:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:px-36">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8 ">
              <ProductDetails form={form} />
              <ProductVariant form={form} />
              <ProductPrice form={form} />
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ImageField
                images={product.productImages}
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
                      done: "Cập nhật thành công",
                      error: "Lỗi lưu sản phẩm",
                      idle: "Cập nhật sản phẩm",
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
      <AddToCardButton
        props={{
          variant: product.productVariants,
          productId: product.productId,
          productName: product.productName,
        }}
      />
    </div>
  );
};

export default ModifyProductPage;
