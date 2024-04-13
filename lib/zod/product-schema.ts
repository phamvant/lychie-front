import z from "zod";

const productVariantSchema = {
  size: z.array(z.string()),
  color: z.array(z.string()),
  material: z.string().optional(),
};

export const productSchema = z
  .object({
    productName: z.string().optional(),
    productCode: z.coerce.string(),
    productDescription: z.string().trim().min(1, "Description is required"),
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
