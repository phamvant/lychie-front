"use client";

import { CategoryDto } from "@/models/category-dto";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Providers";
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
import { AddCategoryButton } from "./add-category-form";

const COLOR = [
  "Xanh lam",
  "Đỏ",
  "Vàng",
  "Hồng",
  "Tím",
  "Cam",
  "Lục",
  "Nâu",
  "Xám",
  "Trắng",
  "Đen",
];

const SIZE1 = ["34", "35", "36", "37", "38", "39", "40", "Free"];
const SIZE2 = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "Free"];

export function ProductVariant({
  form,
  onCategoryChange,
}: {
  form: any;
  onCategoryChange?: any;
}) {
  const { categories } = useContext(ProductContext);
  const [displayCategories, setDisplayCategories] = categories;
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>();
  const [sizeType, setSizeType] = useState<string[]>(SIZE1);

  const onChangeSizeType = (e: string) => {
    switch (e) {
      case "number":
        setSizeType(SIZE1);
        break;
      case "text":
        setSizeType(SIZE2);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    try {
      setSelectedCategory(
        displayCategories.find(
          (category: CategoryDto) =>
            category.categoryName === form.getValues("productCategory")
        )
      );

      onChangeSizeType(form.getValues("productSizeType"));
    } catch (e) {}
  }, [displayCategories, form.watch(["productSizeType"])]);

  if (!displayCategories) {
    return <>Loading...</>;
  }

  return (
    <Card
      x-chunk="dashboard-07-chunk-2"
      className="bg-white max-w-sm lg:max-w-xl"
    >
      <div className="flex flex-col">
        <CardHeader className="grid grid-cols-8 items-center">
          <CardTitle className="col-span-5">Phân loại</CardTitle>
          <div className="col-span-3 lg:hidden">
            <AddCategoryButton />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="hidden items-end lg:flex">
            <AddCategoryButton />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phân loại</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        onCategoryChange();
                        setSelectedCategory(
                          displayCategories.find(
                            (category: CategoryDto) =>
                              category.categoryName === e
                          )
                        );
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {displayCategories.map(
                          (value: CategoryDto, index: string) => (
                            <SelectItem value={value.categoryName} key={index}>
                              {value.categoryName}
                            </SelectItem>
                          )
                        )}
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
                      onValueChange={(e) => {
                        field.onChange(e);
                        onCategoryChange();
                      }}
                      value={field.value}
                    >
                      <FormLabel>Phân loại chi tiết</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedCategory ? (
                          selectedCategory.categorySubName.map(
                            (value, index) => (
                              <SelectItem value={value} key={index}>
                                {value}
                              </SelectItem>
                            )
                          )
                        ) : (
                          <></>
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="productVariants.sizeType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(e) => {
                        onChangeSizeType(e);
                        field.onChange(e);
                      }}
                      value={form.value}
                      defaultValue="number"
                    >
                      <FormLabel>Loại size</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="number">Số</SelectItem>
                        <SelectItem value="text">Chữ</SelectItem>
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
                    className="grid grid-cols-8 lg:grid-cols-11 xl:grid-cols-12"
                    value={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    {sizeType.map((value, index) => (
                      <ToggleGroupItem
                        value={value}
                        key={index}
                        className="min-w-[40px]"
                      >
                        {value}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormItem>
              )}
            />
          </div>

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
                      field.onChange(e.map((value) => value));
                    }}
                    defaultOptions={COLOR}
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
}
