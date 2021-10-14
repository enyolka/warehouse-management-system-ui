import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Box } from "@mui/system";
import styles from "./App.module.css";
import StoreProvider from "./store/StoreProvider";
import Content from "./components/content/Content";
import StartScreen from "./components/startScreen/startScreen";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Box className={styles.root}>
          <Content />
          {/* <StartScreen /> */}
          {/* <div className="App">
        <header className="App-header">
          Hello
        </header>
      </div> */}
        </Box>
      </Router>
    </StoreProvider>
  );
}

export default App;
