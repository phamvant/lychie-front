"use client"; // this registers <Editor> as a Client Component

import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

// Gets the previously stored editor contents.
const initialContent: string | null = localStorage.getItem("editorContent");

const uploadToTmpFilesDotOrg_DEV_ONLY = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const url = await response.json().then(({ data }) => data.url);
    const indexOfOrg = url.indexOf("org");

    const newUrl =
      url.slice(0, indexOfOrg + 3) + "/dl" + url.slice(indexOfOrg + 3);

    return newUrl;
  } else {
    console.log(response.statusText);
    return response.statusText;
  }
};

// Our <Editor> component we can reuse later
export default function Editor() {
  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    // If the editor contents were previously saved, restores them.
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    // Serializes and saves the editor contents to local storage.
    onEditorContentChange: (editor) => {
      localStorage.setItem(
        "editorContent",
        JSON.stringify(editor.topLevelBlocks)
      );
    },

    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
}
