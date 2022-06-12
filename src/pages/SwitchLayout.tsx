import React, { useEffect, useState } from "react";
import { App } from "./DesktopCreepy";
import { MobileCreepy } from "./MobileCreepy";

export const SwitchLayout = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const breakpoint = 600;
  return width < breakpoint ? <MobileCreepy /> : <App />;
};
