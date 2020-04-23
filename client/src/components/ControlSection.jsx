import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import { ReactComponent as Rocket } from "../assets/rocket.svg";
import { mediaQuery, colors } from "../theme";

const Container = styled.div`
  background-color: ${colors.secondaryBgColor};
  display: flex;
  padding: 12px;
  height: 25%;
  display: flex;
  ${mediaQuery.desktop} {
    margin: auto auto;
    width: 50% !important;
    flex-direction: row;
    overflow: auto;
  }

  ${mediaQuery.mobile} {
    width: 25% !important;
    flex-direction: column;
    height: 100%;
  }
`;

export default function () {
  const dispatch = useDispatch();
  const capsules = useSelector(({ spaceData: capsules }) => {
    return JSON.stringify(capsules, undefined, 2);
  });

  React.useEffect(() => {
    actions.getUpcomingCapsules(dispatch);
  }, []);

  return (
    <Container>
      <button>CAPSULES</button>
      <Rocket />
      <input />
      <button>CAPSULES</button>
    </Container>
  );
}
