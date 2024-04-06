import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NewspaperIcon } from "lucide-react";
import Search from "../appbar/search";
import { Separator } from "../ui/separator";

const EditorSidebar = () => {
  return (
    <div className="flex flex-col justify-between h-screen ">
      <div className="flex flex-col">
        <div className="flex flex-col gap-6">
          <Search className="mt-4 w-full rounded-full" />
          <div className="flex flex-row gap-5 items-center text-gray-600 text-sm font-semibold hover:bg-slate-100 p-2 rounded-full cursor-pointer pl-4 text-end">
            <NewspaperIcon strokeWidth={1} color="grey" size={20} />
            <div>New Post</div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="pl-4 text-gray-600 text-xs">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>PINNED</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>MY DRAFT</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>PUBLISHED</AccordionTrigger>
              <AccordionContent>
                Yes. Its animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="bg-blue-300 h-52"></div>
    </div>
  );
};

export default EditorSidebar;
