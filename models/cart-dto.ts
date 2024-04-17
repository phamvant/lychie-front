export interface CartDto {
  cartProductId: string;
  cartProductVariants: any;
  cartProductAmount: number;
  cartProductPrice: number;
  cartProductFinalPrice: number;
  cartProduct: {
    productCode: string;
    productPrice: number;
    productFinalPrice: number;
  };
}
