"use client";

import { CartDto } from "@/models/cart-dto";
import { addThousandSeparator } from "@/utils/thousands-separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PenIcon, TrashIcon } from "lucide-react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const CartTable = ({
  productsProp,
  session,
}: {
  productsProp: CartDto[];
  session: Session;
}) => {
  const [products, setProduct] = useState<CartDto[]>([]);
  const [status, setStatus] = useState<string>("idle");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (productsProp) {
      setProduct(productsProp);
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setStatus("fetching");
    const res = await fetch(process.env.BACKEND_URL + "/cart/change-amount", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
  };

  const onDelete = async (cartProductId: string) => {
    setStatus("fetching");
    const res = await fetch(process.env.BACKEND_URL + "/cart/delete", {
      method: "POST",
      body: JSON.stringify({ cartProductId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sản phẩm</TableHead>
          <TableHead className="hidden sm:table-cell sm:text-center">
            Kích cỡ
          </TableHead>
          <TableHead className="hidden sm:table-cell sm:text-center">
            Màu sắc
          </TableHead>
          <TableHead className="hidden md:table-cell sm:text-center">
            Giá đơn
          </TableHead>
          <TableHead className="hidden md:table-cell sm:text-center">
            Số lượng
          </TableHead>
          <TableHead className="text-right sm:text-center">Tổng giá</TableHead>
          <TableHead className="text-right sm:text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={index} className="">
            <TableCell>
              <div className="text-lg">{product.cartProduct.productCode}</div>
            </TableCell>

            <TableCell className="hidden sm:table-cell sm:text-center text-md">
              {product.cartProductVariants.size}
            </TableCell>
            <TableCell className="hidden sm:table-cell sm:text-center">
              <Badge className="text-md" variant="secondary">
                {product.cartProductVariants.color}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell sm:text-center">
              <div className="font-medium">
                {addThousandSeparator(product.cartProduct.productFinalPrice)}đ
              </div>
              <div className="hidden text-xs text-muted-foreground md:inline line-through">
                {addThousandSeparator(product.cartProduct.productPrice)}đ
              </div>
            </TableCell>
            <TableCell className="flex justify-center">
              <div className="font-medium">{product.cartProductAmount}</div>
            </TableCell>
            <TableCell className="sm:text-center">
              <div className="font-medium">
                {addThousandSeparator(
                  product.cartProduct.productPrice * product.cartProductAmount
                )}
                đ
              </div>
              <div className="hidden text-xs text-muted-foreground md:inline line-through">
                {addThousandSeparator(
                  product.cartProduct.productFinalPrice *
                    product.cartProductAmount
                )}
                đ
              </div>
            </TableCell>
            <TableCell className="flex justify-around">
              <Dialog>
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
                  <DialogFooter className="sm:justify-start"></DialogFooter>
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
