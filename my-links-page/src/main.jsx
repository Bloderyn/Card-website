import { createTheme, MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import App from "./App.jsx";
import "./style.css";

const theme = createTheme({
  primaryColor: "grape",
  fontFamily: '"Hanken Grotesk", sans-serif',
});

createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <App />
  </MantineProvider>,
);
