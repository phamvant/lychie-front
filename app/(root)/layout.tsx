import { AppBar } from "@/components/appbar/app-bar";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <div>
      <AppBar />
      <div className="pt-10 lg:pt-16 mb-20">{children}</div>
    </div>
  );
};

export default RootLayout;
