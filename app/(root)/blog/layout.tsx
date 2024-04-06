type Props = {
  children: React.ReactNode;
};

const blogPageLayout = ({ children }: Props) => {
  return <div className="flex content-center justify-around ">{children}</div>;
};

export default blogPageLayout;
