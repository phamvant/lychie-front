import { AppBar } from "@/components/appbar/app-bar";
import HeroHeader from "@/components/hero";
import PayPlan from "@/components/pay-plan";

export default async function Home() {
  return (
    <>
      {/* <Sidebar2 /> */}
      <AppBar />
      <HeroHeader />
      <PayPlan />
    </>
  );
}
