import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

export const ProductDetails = ({ form }: { form: any }) => {
  return (
    <Card
      x-chunk="dashboard-07-chunk-0"
      className="bg-white max-w-sm lg:max-w-xl"
    >
      <CardHeader>
        <CardTitle>Chi tiết sản phẩm</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      placeholder="Tên sản phẩm"
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
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miêu tả</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      type="text"
                      className="w-full"
                      placeholder="Miêu tả"
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
              name="productMemo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Input
                      id="productMemo"
                      type="text"
                      className="w-full"
                      placeholder="Ghi chú"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
