"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { FormField, FormItem, FormMessage } from "./form";
import { Label } from "./label";

type Color = Record<"value" | "label", string>;

const COLOR = [
  {
    value: "blue",
    label: "Xanh lam",
  },
  {
    value: "red",
    label: "Đỏ",
  },
  {
    value: "yellow",
    label: "Vàng",
  },
  {
    value: "purple",
    label: "Tím",
  },
  {
    value: "orange",
    label: "Cam",
  },
  {
    value: "green",
    label: "Lục",
  },
  {
    value: "brown",
    label: "Nâu",
  },
  {
    value: "gray",
    label: "Xám",
  },
  {
    value: "white",
    label: "Trắng",
  },
  {
    value: "black",
    label: "Đen",
  },
] satisfies Color[];

export const FancyMultiSelect = ({ form }: { form: any }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Color[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((framework: Color) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = COLOR.filter((color) => {
    if (selected) {
      return !selected.includes(color);
    }
    return [COLOR[0]];
  });

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="grid overflow-visible bg-transparent"
    >
      <div className="flex flex-col gap-4">
        <Label>Màu sắc</Label>
        <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap">
            {form.watch(["productVariants.color"]) !== undefined ? (
              COLOR.filter((value) =>
                form.watch(["productVariants.color"]).includes(value.value)
              ).map((framework) => {
                return (
                  <Badge key={framework.value} variant="secondary">
                    {framework.label}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(framework);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(framework)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                );
              })
            ) : (
              <></>
            )}

            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Chọn màu sắc..."
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <FormField
                control={form.control}
                name="productVariants.color"
                render={({ field }) => (
                  <FormItem>
                    <CommandGroup className="h-full overflow-auto">
                      {selectables.map((framework) => {
                        return (
                          <CommandItem
                            key={framework.value}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onSelect={() => {
                              setInputValue("");
                              field.onChange([
                                ...selected.map((value) => value.value),
                                framework.value,
                              ]);
                              setSelected((prev) => {
                                return [...prev, framework];
                              });
                            }}
                            className={"cursor-pointer"}
                          >
                            {framework.label}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Command>
  );
};
