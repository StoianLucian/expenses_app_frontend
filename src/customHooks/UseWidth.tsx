import { useEffect, useState } from "react";

export const UseWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handlerResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handlerResize);

    return () => window.removeEventListener("resize", handlerResize);
  }, []);

  const isMobile = () => width < 500;

  return { isMobile };
};
