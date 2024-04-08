import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const ProductVariant = ({ form }: { form: any }) => {
  return (
    <Card
      x-chunk="dashboard-07-chunk-1"
      className="bg-white max-w-sm lg:max-w-xl "
    >
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>Chi tiết</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
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
                      type="text"
                      placeholder="Giá nhập"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
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
                      type="text"
                      placeholder="Giá bán"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="productVariants.size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    className="grid grid-cols-12"
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <ToggleGroupItem value="XS">XS</ToggleGroupItem>
                    <ToggleGroupItem value="S">S</ToggleGroupItem>
                    <ToggleGroupItem value="M">M</ToggleGroupItem>
                    <ToggleGroupItem value="L">L</ToggleGroupItem>
                    <ToggleGroupItem value="XL">XL</ToggleGroupItem>
                  </ToggleGroup>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="productVariants.color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Màu sắc</FormLabel>
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    className="grid grid-cols-8"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <ToggleGroupItem value="Blue">Xanh</ToggleGroupItem>
                    <ToggleGroupItem value="Red">Đỏ</ToggleGroupItem>
                    <ToggleGroupItem value="Purple">Tím</ToggleGroupItem>
                    <ToggleGroupItem value="Yellow">Vàng</ToggleGroupItem>
                    <ToggleGroupItem value="Black">Đen</ToggleGroupItem>
                  </ToggleGroup>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
