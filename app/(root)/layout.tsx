import { AppBar } from "@/components/appbar/app-bar";
import Footer from "@/components/footer";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <div>
      <AppBar />
      <div className="pt-10 lg:pt-16">{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
