"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { useState } from "react";

const DeleteProductDialog = ({
  productCode,
  productId,
  session,
}: {
  productCode: string;
  productId: string;
  session: Session;
}) => {
  const [deleteButtonStatus, setDeleteButtonStatus] = useState<string>("idle");
  const [deleteProductMessage, setDeleteProductMessage] = useState<string>("");

  const onClickDelete = async () => {
    try {
      const deleteResponse = await fetch(
        process.env.BACKEND_URL + `/product/delete`,
        {
          method: "PUT",
          body: JSON.stringify({ productId }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        setDeleteButtonStatus("failed");
        const responseMessage = await deleteResponse.json();
        setDeleteProductMessage(responseMessage.message);

        throw new Error();
      }

      setDeleteButtonStatus("success");
    } catch (error) {
      setDeleteButtonStatus("error");
      console.error("Error during concurrent requests:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" type="button" variant="destructive">
          Xoá sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent className="w-30 rounded-lg">
        <DialogHeader>
          <DialogTitle className="mt-5">
            Xoá sản phẩm : {productCode}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>Bạn có muốn xoá sản phẩm?</DialogDescription>
        <Button
          disabled={deleteButtonStatus === "fetching"}
          variant={deleteButtonStatus === "error" ? "destructive" : "secondary"}
          size="sm"
          onClick={onClickDelete}
          type="button"
        >
          {deleteButtonStatus === "fetching" ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            ""
          )}
          {deleteButtonStatus === "success" ? (
            <span className="text-green-500">Đã xoá</span>
          ) : (
            ""
          )}
          {deleteButtonStatus === "error" ? (
            <span>{deleteProductMessage}!</span>
          ) : (
            ""
          )}
          {deleteButtonStatus === "idle" ? (
            <span className="text-red-500">Xoá sản phẩm</span>
          ) : (
            ""
          )}
        </Button>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
