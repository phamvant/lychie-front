import z from "zod";

const productVariantSchema = {
  size: z.array(z.string()),
  color: z.array(z.string()),
  material: z.string().optional(),
};

const cartVariantSchema = {
  size: z.coerce.number(),
  color: z.string(),
};

export const cartSchema = z.object({
  cartProductId: z.string(),
  cartProductCode: z.string(),
  cartProductVariant: z.object(cartVariantSchema),
  cartProductAmount: z.coerce.number(),
  cartProductPrice: z.coerce.number(),
  cartProductFinalPrice: z.coerce.number(),
  cartPrice: z.coerce.number(),
  cartFinalPrice: z.coerce.number(),
  cartCartId: z.string().default("661e9520d5c458cbcfcf3117"),
});

export const productSchema = z
  .object({
    productName: z.string().optional(),
    productCode: z.coerce.string(),
    productDescription: z.string().optional(),
    productCostPrice: z.coerce.number().min(1, "Price is required"),
    productPrice: z.coerce.number().min(1, "Price is required"),
    productFinalPrice: z.coerce.number().min(1, "Calculate error"),
    productDiscountType: z.string(),
    productDiscountAmount: z.coerce.number().optional(),
    productCategory: z.string(),
    productSubCategory: z.string().optional(),
    productMemo: z.string().optional(),
    productVariants: z.object(productVariantSchema),
    productIsPosted: z.boolean().default(false),
  })
  .refine((schema) => {
    return !(
      (schema.productDiscountType === "none" &&
        schema.productDiscountAmount !== 0) ||
      (schema.productDiscountType !== "none" &&
        schema.productDiscountAmount === 0)
    );
  }, "Discount Error");
