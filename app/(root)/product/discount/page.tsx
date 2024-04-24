"use client";

import { StateButtonNorm } from "@/components/button/three-states-nor-button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DiscountDto } from "@/models/discount-dto";
import { GiftIcon } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const contents = [{ title: "OPENNING", value: "Giảm giá tất cả 100%" }];

const DiscountPage = () => {
  const [status, setStatus] = useState<string>("idle");
  const [discountData, setDiscountData] = useState<DiscountDto[]>([]);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchDiscountData = async (session: Session) => {
      try {
        const discountResponse = await fetch(
          `${process.env.BACKEND_URL}/discount`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.backendTokens.accessToken}`,
            },
          }
        );

        if (!discountResponse.ok) {
          throw new Error(
            `Failed to fetch discount: ${discountResponse.statusText}`
          );
        }

        const discount = await discountResponse.json();
        setDiscountData(discount);
      } catch (e) {
        return false;
      }
    };

    if (session) {
      fetchDiscountData(session);
    }
  }, [session]);

  const updateDiscount = async (discountCode: string) => {
    try {
      setStatus("fetching");

      const updateDiscountRes = await fetch(
        `${process.env.BACKEND_URL}/discount/modify`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
          body: JSON.stringify({
            discountCode: discountCode,
            discountAmount: discountAmount,
          }),
        }
      );

      if (!updateDiscountRes.ok) {
        setStatus("error");
      }

      setStatus("done");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  const activeDiscount = async (discountCode: string, isActive: boolean) => {
    try {
      const updateDiscountRes = await fetch(
        `${process.env.BACKEND_URL}/discount/${
          isActive ? "active" : "deactive"
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
          body: JSON.stringify({
            discountCode: discountCode,
          }),
        }
      );

      if (!updateDiscountRes.ok) {
        return !isActive;
      }

      return isActive;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 h-screen w-full">
      <div className="flex flex-col w-full gap-6">
        {discountData.map((discount, index) => {
          return (
            <Dialog key={index}>
              <div className="flex justify-between items-center w-full shadow-md rounded-md p-4 gap-10">
                <DialogTrigger asChild>
                  <div className="flex gap-2 lg:gap-10 items-center">
                    <GiftIcon
                      size={40}
                      color="orange"
                      className="hidden lg:flex lg:ml-4"
                    />
                    <div className="flex flex-col gap-4">
                      <p className="text-lg font-semibold">
                        {discount.discountCode}
                      </p>
                      <p className="text-lg text-muted-foreground max-w-xs">
                        {discount.discountDescription}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <Switch
                  defaultChecked={discount.discountIsActive}
                  onCheckedChange={(e) => {
                    const ret = activeDiscount(discount.discountCode, e);
                  }}
                />
              </div>

              <DialogContent className="w-4/5 rounded-lg">
                <Input
                  // contentEditable={false}
                  id="discountAmount"
                  type="number"
                  placeholder="Giảm giá"
                  className="w-full mt-4"
                  onChange={(e) => {
                    setDiscountAmount(Number(e.target.value));
                  }}
                />
                <StateButtonNorm
                  status={status}
                  state={{
                    idle: "Cập nhật",
                    done: "Đã cập nhật",
                    error: "Cập nhật lỗi",
                  }}
                  onClick={() => {
                    updateDiscount(discount.discountCode);
                  }}
                />
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

export default DiscountPage;
