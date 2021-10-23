import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Box } from "@mui/system";
import StoreProvider from "../../redux/store/StoreProvider";
import Content from "./Content";
import Header from "./Header";
import styles from "./App.module.css";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Box className={styles.root}>
          <Header />
          <Content />
        </Box>
      </Router>
    </StoreProvider>
  );
}

export default App;
