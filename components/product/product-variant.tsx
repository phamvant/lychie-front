import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import MultipleSelector from "../ui/mutiple-select";
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
                          <SelectValue placeholder="-" />
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
                          <SelectValue placeholder="-" />
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
          {/* {form.watch(["productVariants.color"]) !== undefined ? (
            <FancyMultiSelect form={form} />
          ) : (
            <></>
          )} */}
          <FormField
            control={form.control}
            name="productVariants.color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Màu sắc</FormLabel>
                <FormControl>
                  <MultipleSelector
                    creatable
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.map((value) => value.value));
                    }}
                    placeholder="Nhập màu sắc..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </div>
    </Card>
  );
};
