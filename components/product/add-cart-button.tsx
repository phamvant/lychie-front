"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { CategoryContext } from "../Providers";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const formSchema = z.object({
  productId: z.string(),
  cartProductVariants: z.object({
    size: z.string(),
    color: z.string(),
  }),
  cartProductAmount: z.coerce.number().min(1),
  cartCustomerName: z.string(),
});

export const AddToCardButton = ({ props }: any) => {
  const { cartNumber } = useContext(CategoryContext);
  const [orderAmount, setOrderAmount] = cartNumber;
  const [status, setStatus] = useState<string>("idle");
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cartProductVariants: {},
      productId: props.productId,
    },
  });

  async function onSubmitCart(values: z.infer<typeof formSchema>) {
    setStatus("fetching");
    console.log(values);

    try {
      const registerResponse = await fetch(
        process.env.BACKEND_URL + "/cart/add",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );

      if (!registerResponse.ok) {
        setStatus("error");
        console.error(
          "Error registering product:",
          await registerResponse.text()
        );

        throw new Error();
      }

      setStatus("success");
      setOrderAmount((prev: number) => prev + 1);
    } catch (error) {
      setStatus("error");
      console.error("Error during concurrent requests:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="h-16 w-16 mr-4 fixed bottom-12 right-8 p-2 flex items-center justify-center rounded-full lg:left-16"
          variant={"default"}
        >
          <div>+</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-lg">
        <DialogHeader className="mb-4">
          <DialogTitle>Thêm giỏ hàng</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitCart)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="cartProductVariants.color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Màu sắc</FormLabel>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      className="grid grid-cols-3 lg:grid-cols-5"
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      {props.variant.color.map(
                        (value: string, index: number) => (
                          <ToggleGroupItem
                            value={value}
                            key={index}
                            className="min-w-[40px]"
                          >
                            {value}
                          </ToggleGroupItem>
                        )
                      )}
                    </ToggleGroup>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cartProductVariants.size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      className="grid grid-cols-6 lg:grid-cols-9"
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      {props.variant.size.map(
                        (value: string, index: number) => (
                          <ToggleGroupItem
                            value={value}
                            key={index}
                            className="min-w-[40px]"
                          >
                            {value}
                          </ToggleGroupItem>
                        )
                      )}
                    </ToggleGroup>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cartProductAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        // contentEditable={false}
                        id="productAmount"
                        type="number"
                        placeholder="Số lượng sản phẩm"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cartCustomerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        id="cartCustomerName"
                        type="text"
                        placeholder="Tên khách hàng"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                // disabled={status === "fetching"}
                variant={
                  (status === "success" || status === "error" ? true : false)
                    ? "secondary"
                    : "default"
                }
                size="sm"
                type="submit"
                className="h-14 rounded-2xl mt-5"
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
                  <span className="text-green-500">Đã lưu</span>
                ) : (
                  ""
                )}
                {status === "error" ? (
                  <span className="text-red-500">Lỗi lưu!</span>
                ) : (
                  ""
                )}
                {status === "idle" ? <>Thêm vào giỏ hàng</> : ""}
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
