import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const ProductVariant = ({
  form,
  onSizeChange,
  size,
  onColorChange,
  color,
}: {
  form: any;
  onSizeChange: any;
  size: string[];
  onColorChange: any;
  color: string[];
}) => {
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
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Size</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="grid grid-cols-12"
              onValueChange={onSizeChange}
              defaultValue={size}
            >
              <ToggleGroupItem value="XS">XS</ToggleGroupItem>
              <ToggleGroupItem value="S">S</ToggleGroupItem>
              <ToggleGroupItem value="M">M</ToggleGroupItem>
              <ToggleGroupItem value="L">L</ToggleGroupItem>
              <ToggleGroupItem value="XL">XL</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Màu sắc</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="grid grid-cols-8"
              onValueChange={onColorChange}
              defaultValue={color}
            >
              <ToggleGroupItem value="Blue">Xanh</ToggleGroupItem>
              <ToggleGroupItem value="Red">Đỏ</ToggleGroupItem>
              <ToggleGroupItem value="Purple">Tím</ToggleGroupItem>
              <ToggleGroupItem value="Yellow">Vàng</ToggleGroupItem>
              <ToggleGroupItem value="Black">Đen</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
