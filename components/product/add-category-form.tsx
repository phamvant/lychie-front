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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  categoryName: z.string().min(5),
  categorySubName: z.string().min(8),
});

export const AddCategoryButton = () => {
  const [status, setStatus] = useState<string>("idle");
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categorySubName: "",
    },
  });

  async function onSubmitCategory(values: z.infer<typeof formSchema>) {
    setStatus("fetching");

    const queryObj = { ...values, categorySubName: [values.categorySubName] };
    try {
      //----------------ProductRegiter----------------//

      const registerResponse = await fetch(
        process.env.BACKEND_URL + "/category/create",
        {
          method: "POST",
          body: JSON.stringify(queryObj),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );

      if (!registerResponse.ok) {
        setStatus("failed");
        // Handle registration request error
        console.error(
          "Error registering product:",
          await registerResponse.text()
        );

        throw new Error();
      }

      setStatus("success");
      () => toast("Product has been created");
    } catch (error) {
      setStatus("error");
      console.error("Error during concurrent requests:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="h-8 mr-4" variant={"default"}>
          Thêm phân loại
        </Button>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Thêm phân loại</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                console.log(e);
                e.stopPropagation();
                // form.handleSubmit((e.));
                onSubmitCategory({
                  categoryName: form.getValues("categoryName"),
                  categorySubName: form.getValues("categorySubName"),
                });
              }}
            >
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Tên phân loại</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên phân loại" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categorySubName"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Tên phân loại chi tiết</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tên phân loại"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={status === "fetching"}
                variant={
                  (status === "success" || status === "error" ? true : false)
                    ? "secondary"
                    : "default"
                }
                size="sm"
                type="submit"
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
                {status === "idle" ? <>Lưu phân loại</> : ""}
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
