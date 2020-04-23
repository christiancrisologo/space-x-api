import { hot } from "react-hot-loader/root";
import React from "react";
import GlobalStyle from "../theme";
import { Application } from "./styles";
import ConsoleSection from "../components/ConsoleSection";
import ControlSection from "../components/ControlSection";

const App = () => (
  <>
    <Application>
      <ConsoleSection />
      <ControlSection />
    </Application>
    <GlobalStyle />
  </>
);

export default hot(App);
