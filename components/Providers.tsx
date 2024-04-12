"use client";

import { CategoryDto } from "@/app/(root)/product/category-dto";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const CategoryContext = createContext<{
  categories: any;
  session: Session | null;
}>({ categories: [], session: null });

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ContextProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<CategoryDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

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
        // console.log(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <CategoryContext.Provider
      value={{ categories: [categories, setCategories], session: session }}
    >
      {children}{" "}
    </CategoryContext.Provider>
  );
};
