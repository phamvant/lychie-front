import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  if (!data.session || !data.session.user) {
    return redirect("/");
  }

  return (
    <div className="m-2 border rounded shadow overflow-hidden">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
        User Profile
      </div>

      <div className="grid grid-cols-2  p-2 gap-2">
        <p className="p-2 text-slate-400">Name:</p>
        <p className="p-2 text-slate-950">{data.user.username}</p>
        <p className="p-2 text-slate-400">Email:</p>
        <p className="p-2 text-slate-950">{data.user.email}</p>
      </div>
    </div>
  );
};

const getData = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = await fetch(process.env.BACKEND_URL + `/user/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();

  return { user, session };
};

export default ProfilePage;
