import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const SaveButton = ({ status }: { status: string }) => {
  return (
    <Card
      x-chunk="dashboard-07-chunk-5"
      className="bg-white max-w-sm lg:max-w-xl"
    >
      <CardHeader>
        <CardTitle>Lưu sản phẩm</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={status === "fetching"}
          variant={
            (status === "success" ? true : false) ? "secondary" : "default"
          }
          size="sm"
          type="submit"
        >
          {status === "fetching" ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            ""
          )}
          {status === "success" ? (
            <span className="text-green-500">Đã lưu</span>
          ) : (
            ""
          )}
          {status === "idle" ? <>Lưu sản phẩm</> : ""}
        </Button>
      </CardContent>
    </Card>
  );
};
