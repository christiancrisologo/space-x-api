import { hot } from "react-hot-loader/root";
import React from "react";
import GlobalStyle from "../theme";
import { Application, DisplayContainer, ActionContainer } from "./styles";
import { ReactComponent as Rocket } from "../assets/rocket.svg";

const App = () => (
  <>
    <Application>
      <Rocket />
      <DisplayContainer></DisplayContainer>
      <ActionContainer></ActionContainer>
    </Application>
    <GlobalStyle />
  </>
);

export default hot(App);
