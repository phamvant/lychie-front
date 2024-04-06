import React from "react";

const useViewport = () => {
  const [width, setWidth] = React.useState(1000);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};

export default useViewport;
