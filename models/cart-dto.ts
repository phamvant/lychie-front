export interface CartDto {
  cartProductId: string;
  cartProductVariants: any;
  cartProductAmount: number;
  cartProductPrice: number;
  cartProductFinalPrice: number;
  cartCustomerName: string;
  cartProduct: {
    productCode: string;
    productPrice: number;
    productFinalPrice: number;
  };
}
