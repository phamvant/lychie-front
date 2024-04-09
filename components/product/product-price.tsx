import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const ProductPrice = ({ form }: { form: any }) => {
  const onChangePrice = () => {
    let finalPrice = 0;
    switch (form.getValues("productDiscountType")) {
      case "percentage":
        finalPrice =
          form.getValues("productPrice") -
          (form.getValues("productDiscountAmount") *
            form.getValues("productPrice")) /
            100;
        break;
      case "fixed":
        finalPrice =
          form.getValues("productPrice") -
          form.getValues("productDiscountAmount");
        break;
      default:
        finalPrice = form.getValues("productPrice");
        break;
    }

    form.setValue("productFinalPrice", finalPrice);
  };

  return (
    <Card
      x-chunk="dashboard-07-chunk-1"
      className="bg-white max-w-sm lg:max-w-xl "
    >
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>Giá</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="productCostPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá nhập</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="number"
                        placeholder="Giá nhập"
                        className="w-full"
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="productPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá bán</FormLabel>
                    <FormControl>
                      <Input
                        id="productPrice"
                        type="number"
                        placeholder="Giá bán"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          onChangePrice();
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              {" "}
              <FormField
                control={form.control}
                name="productDiscountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại giảm giá</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        onChangePrice();
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">-</SelectItem>
                        <SelectItem value="percentage">Phần trăm</SelectItem>
                        <SelectItem value="fixed">Cố định</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="productDiscountAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lượng giảm</FormLabel>
                    <FormControl>
                      <Input
                        contentEditable={false}
                        id="productDiscountAmount"
                        type="number"
                        placeholder="Lượng giảm"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          onChangePrice();
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="productFinalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá cuối</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      id="productFinalPrice"
                      type="number"
                      placeholder="Giá cuối"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
