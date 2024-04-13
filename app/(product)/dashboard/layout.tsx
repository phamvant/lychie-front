import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Dashboard from "./page";

const DashboardLayout = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardLayout;
