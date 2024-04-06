type Props = {
  children: React.ReactNode;
};

const editorPageLayout = ({ children }: Props) => {
  return <div className="m-auto max-w-[1500px] h-screen">{children}</div>;
};

export default editorPageLayout;
