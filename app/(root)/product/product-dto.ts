export interface ProductDto {
  productId: string;
  productName: string;
  productDescription: string;
  productCostPrice: number;
  productPrice: number;
  productFinalPrice?: number;
  productDiscountType?: string;
  productDiscountAmount?: number;
  productCategory: string;
  productSubCategory: string;
  productVariants: any;
  productImages: string[];
  productMemo: string;
}
