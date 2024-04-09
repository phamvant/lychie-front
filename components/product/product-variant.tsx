import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FancyMultiSelect } from "../ui/fancy-multiple-select";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const ProductVariant = ({ form }: { form: any }) => {
  return (
    <Card
      x-chunk="dashboard-07-chunk-2"
      className="bg-white max-w-sm lg:max-w-xl"
    >
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>Phân loại sản phẩm</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phân loại</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Clothes">Clothes</SelectItem>
                        <SelectItem value="Dress">Dress</SelectItem>
                        <SelectItem value="Bag">Bag</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="productSubCategory"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormLabel>Phân loại chi tiết</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="T-shirts">T-Shirts</SelectItem>
                        <SelectItem value="Hoodies">Hoodies</SelectItem>
                        <SelectItem value="Sweatshirts">Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
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
          {form.watch(["productVariants.color"]) !== undefined ? (
            <FancyMultiSelect form={form} />
          ) : (
            <></>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
