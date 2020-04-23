import styled from "styled-components";
import { mediaQuery } from "../theme";

const Application = styled.div`
  font-family: Roboto;
  font-weight: 300;
  font-size: 25px;
  font-style: italic;
  color: white;
  width: 100%;
  height: 100%;
  margin: 10px;
  display: flex;
  ${mediaQuery.desktop} {
    flex-direction: column;
  }

  ${mediaQuery.mobile} {
    flex-direction: row;
  }
`;

export { Application };
