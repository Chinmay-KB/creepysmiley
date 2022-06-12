import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./pages/DesktopCreepy";
import { SwitchLayout } from "./pages/SwitchLayout";

const theme = extendTheme({
  fonts: {
    body: "Oxygen",
    heading: "Indie Flower",
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SwitchLayout />
    </ChakraProvider>
  </React.StrictMode>
);
