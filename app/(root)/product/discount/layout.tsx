import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchDiscountData = async (session: Session) => {
  try {
    const discountResponse = await fetch(
      `${process.env.BACKEND_URL}/discount`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
        cache: "force-cache",
      }
    );

    if (!discountResponse.ok) {
      throw new Error(
        `Failed to fetch discount: ${discountResponse.statusText}`
      );
    }
  } catch (e) {
    return false;
  }
};

const DiscountPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  fetchDiscountData(session);

  return <div className="w-11/12 md:w-3/5 pt-5">{children}</div>;
};

export default DiscountPageLayout;
