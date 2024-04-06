"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

const EditorPage = () => {
  return (
    <div className="">
      <div className="mt-1 h-14 w-full mb-4 border-b flex flex-row justify-between items-centerc">
        <div></div>
        <div className="flex flex-row gap-4 items-center">
          <Button className="rounded-full " variant={"outline"}>
            Preview
          </Button>
          <Button className="rounded-full bg-blue-600 hover:bg-blue-500">
            Save
          </Button>
        </div>
      </div>
      <Editor />
    </div>
  );
};

export default EditorPage;
