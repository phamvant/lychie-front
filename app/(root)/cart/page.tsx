import CartTable from "@/components/cart/cart-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authOptions } from "@/lib/auth";
import { ListFilter } from "lucide-react";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Filter = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const getCartData = async (session: Session) => {
  const res = await fetch(`${process.env.BACKEND_URL}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.backendTokens.accessToken}`,
    },
  });

  const products = await res.json();
  return products;
};

const CartPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const products = await getCartData(session);

  return (
    <Card x-chunk="dashboard" className="w-full md:w-[95%] xl:w-4/6">
      <CardHeader className="">
        <CardTitle>Đơn hàng</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <CartTable productsProp={products} />
      </CardContent>
    </Card>
  );
};

export default CartPage;
