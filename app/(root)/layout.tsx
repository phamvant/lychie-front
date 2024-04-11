"use client";

import { AppBar } from "@/components/appbar/app-bar";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { CategoryDto } from "./product/category-dto";

type Props = {
  children: React.ReactNode;
};

export const CategoryContext = createContext<{
  categories: any;
  session: Session | null;
}>({ categories: [], session: null });

function RootLayout({ children }: Props) {
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
        console.log(categories);
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

  if (isLoading != false || categories == undefined) {
    return <div>Loading</div>;
  }

  return (
    <CategoryContext.Provider
      value={{ categories: [categories, setCategories], session: session }}
    >
      <div>
        <AppBar />
        <div className="pt-10 lg:pt-16 mb-20">{children}</div>
      </div>
    </CategoryContext.Provider>
  );
}

export default RootLayout;
