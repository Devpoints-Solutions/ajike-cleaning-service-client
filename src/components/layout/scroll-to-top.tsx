import { useEffect } from "react";
import { useLocation } from "wouter";

const ScrollToTop = () => {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
