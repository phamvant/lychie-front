"use client";

import { CartDto } from "@/models/cart-dto";
import { CategoryDto } from "@/models/category-dto";
import { UserDto } from "@/models/user-dto";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const CategoryContext = createContext<{
  categories: any;
  cartNumber: any;
  session: Session | null;
  // userProductsAmount: number | undefined;
}>({ categories: [], session: null, cartNumber: 0 });

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ContextProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<CategoryDto[]>();
  const [cartNumber, setCartNumber] = useState<number>();
  const [user, setUser] = useState<UserDto>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryResponse = await fetch(
          `${process.env.BACKEND_URL}/category`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          }
        );

        if (!categoryResponse.ok) {
          throw new Error(
            `Failed to fetch categories: ${categoryResponse.statusText}`
          );
        }

        const categories = await categoryResponse.json();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCartData = async () => {
      try {
        const cartRes = await fetch(`${process.env.BACKEND_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        });

        if (!cartRes.ok) {
          throw new Error(`Failed to fetch categories: ${cartRes.statusText}`);
        }

        const cartData = (await cartRes.json()) as CartDto[];
        setCartNumber(cartData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session) {
      fetchCategoryData();
      fetchCartData();
      // getUserData();
    }
  }, [session]);

  return (
    <CategoryContext.Provider
      value={{
        categories: [categories, setCategories],
        session: session,
        cartNumber: [cartNumber, setCartNumber],
        // userProductsAmount: user?.userProductsAmount,
      }}
    >
      {children}{" "}
    </CategoryContext.Provider>
  );
};
