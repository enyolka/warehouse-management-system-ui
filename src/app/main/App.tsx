import { HashRouter as Router } from "react-router-dom";
import { Box } from "@mui/system";
import StoreProvider from "../../redux/store/StoreProvider";
import Content from "./Content";
import Header from "./Header";
import styles from "./App.module.css";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "../../styles/theme";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Box className={styles.root}>
            <Header value={value} setValue={setValue} />
            <Content />
          </Box>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
