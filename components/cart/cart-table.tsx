"use client";

import { CartDto } from "@/models/cart-dto";
import { addThousandSeparator } from "@/utils/thousands-separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PenIcon, TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductContext } from "../Providers";
import { StateButton } from "../button/three-states-button";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const formSchema = z.object({
  cartProductId: z.string(),
  cartProductAmount: z.coerce.number(),
});

const CartTable = ({ productsProp }: { productsProp: CartDto[] }) => {
  const { data: session } = useSession();

  const { cartNumber } = useContext(ProductContext);
  const [orderAmount, setOrderAmount] = cartNumber;
  const [products, setProduct] = useState<CartDto[]>(productsProp);
  const [status, setStatus] = useState<string>("idle");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setStatus("fetching");
    const res = await fetch(process.env.BACKEND_URL + "/cart/change-amount", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setProduct(
      products.map((product) => {
        if (product.cartProductId == values.cartProductId) {
          return { ...product, cartProductAmount: values.cartProductAmount };
        }
        return product;
      })
    );
  };

  const onDelete = async (cartProductId: string) => {
    setStatus("fetching");
    const res = await fetch(process.env.BACKEND_URL + "/cart/delete", {
      method: "POST",
      body: JSON.stringify({ cartProductId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("idle");
    setOrderAmount((prev: number) => prev - 1);
    setProduct(
      products.filter((product) => product.cartProductId != cartProductId)
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-xs p-0 md:text-sm">
            Sản phẩm
          </TableHead>
          <TableHead className="text-center text-xs p-0 md:text-sm">
            Kích cỡ
          </TableHead>
          <TableHead className="text-center text-xs p-0 md:text-sm">
            Màu sắc
          </TableHead>
          <TableHead className="hidden md:table-cell text-center text-xs p-0 md:text-sm">
            Giá đơn
          </TableHead>
          <TableHead className="text-center text-xs p-0 md:text-sm">
            Số lượng
          </TableHead>
          <TableHead className="hidden md:table-cell text-center text-xs p-0 md:text-sm">
            Tổng giá
          </TableHead>
          <TableHead className="text-center text-xs p-0 md:text-sm">
            Khách
          </TableHead>
          <TableHead className="hidden md:table-cell text-center text-xs p-0 md:text-sm">
            Thao tác
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={index} className="">
            <TableCell>
              <div className="text-center text-lg">
                {product.cartProduct.productCode}
              </div>
            </TableCell>

            <TableCell className="text-center text-sm">
              {product.cartProductVariants.size}
            </TableCell>
            <TableCell className="text-center">
              <Badge className="text-md" variant="secondary">
                {product.cartProductVariants.color}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:block text-center">
              <div className="font-medium">
                {addThousandSeparator(product.cartProduct.productFinalPrice)}đ
              </div>
              <div className="text-xs text-muted-foreground">
                {addThousandSeparator(product.cartProduct.productPrice)}đ
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div>{product.cartProductAmount}</div>
            </TableCell>
            <TableCell className="hidden md:block text-center">
              <div className="font-medium">
                {addThousandSeparator(
                  product.cartProduct.productFinalPrice *
                    product.cartProductAmount
                )}
                đ
              </div>
              <div className="text-xs text-muted-foreground">
                {addThousandSeparator(
                  product.cartProduct.productPrice * product.cartProductAmount
                )}
                đ
              </div>
            </TableCell>
            <TableCell className="text-center text-md">
              {product.cartCustomerName}
            </TableCell>
            <TableCell className="hidden md:flex justify-around px-0 gap-2">
              <Dialog onOpenChange={() => setStatus("idle")}>
                <DialogTrigger asChild>
                  <Button className="w-10 p-0">
                    <PenIcon size={15} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-30 rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="cartProductAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số lượng sản phẩm</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Amount"
                                {...field}
                                defaultValue={product.cartProductAmount}
                                onChange={(e) => {
                                  field.onChange(e);
                                  form.setValue(
                                    "cartProductId",
                                    product.cartProductId
                                  );
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <StateButton
                        status={status}
                        state={{
                          done: "Thành công",
                          error: "Chỉnh sửa lỗi!",
                          idle: "Chỉnh sửa",
                        }}
                      />
                    </form>
                  </Form>
                  <DialogFooter className=""></DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-10 p-0 bg-red-500">
                    <TrashIcon size={15} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-30 rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="mt-5">
                      Xoá sản phẩm : {product.cartProduct.productCode}
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    Bạn có muốn xoá sản phẩm?
                  </DialogDescription>
                  <Button
                    disabled={status === "fetching"}
                    variant={
                      (
                        status === "success" || status === "error"
                          ? true
                          : false
                      )
                        ? "secondary"
                        : "default"
                    }
                    size="sm"
                    onClick={(e) => {
                      onDelete(product.cartProductId);
                    }}
                  >
                    {status === "fetching" ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Loading
                      </>
                    ) : (
                      ""
                    )}
                    {status === "success" ? (
                      <span className="text-green-500">{"Đã xoá"}</span>
                    ) : (
                      ""
                    )}
                    {status === "error" ? (
                      <span className="text-red-500">{"Lỗi!"}</span>
                    ) : (
                      ""
                    )}
                    {status === "idle" ? <>{"Xoá"}</> : ""}
                  </Button>
                  <DialogFooter className="sm:justify-start"></DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CartTable;
