"use client";

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
  session: Session | null;
  // userProductsAmount: number | undefined;
}>({ categories: [], session: null });

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ContextProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<CategoryDto[]>();
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

    const getUserData = async () => {
      try {
        const userResponse = await fetch(
          `${process.env.BACKEND_URL}/user/${session?.user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }

        const userDate = (await userResponse.json()) as UserDto;
        setUser(userDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session) {
      fetchCategoryData();
      // getUserData();
    }
  }, [session]);

  return (
    <CategoryContext.Provider
      value={{
        categories: [categories, setCategories],
        session: session,
        // userProductsAmount: user?.userProductsAmount,
      }}
    >
      {children}{" "}
    </CategoryContext.Provider>
  );
};
