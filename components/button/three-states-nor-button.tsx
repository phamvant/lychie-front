"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export const StateButtonNorm = ({
  status,
  state,
  onClick,
}: {
  status: string;
  state: {
    done: string;
    error: string;
    idle: string;
  };
  onClick?: any;
}) => {
  return (
    <Button
      disabled={status === "fetching"}
      variant={
        (status === "success" || status === "error" ? true : false)
          ? "secondary"
          : "default"
      }
      size="sm"
      // type="button"
      onClick={onClick}
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
        <span className="text-green-500">{state.done}</span>
      ) : (
        ""
      )}
      {status === "error" ? (
        <span className="text-red-500">{state.error}</span>
      ) : (
        ""
      )}
      {status === "idle" ? <>{state.idle}</> : ""}
    </Button>
  );
};
