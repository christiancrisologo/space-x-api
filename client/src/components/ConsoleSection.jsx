import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import { mediaQuery, colors } from "../theme";

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.98);
  display: flex;
  padding: 12px;
  height: 64%;

  ${mediaQuery.desktop} {
    margin: auto auto;
    width: 50% !important;
    display: flex;
    overflow: auto;
  }

  ${mediaQuery.mobile} {
    width: 70%;
    height: 100%;
  }

  textarea {
    font-size: 12px;
    color: ${colors.textSecondaryColor};
    width: 99%;
    overflow-x: hidden;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
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
      <textarea
        id="consoleTextArea"
        value={capsules}
        cols="50"
        rows="50"
      ></textarea>
    </Container>
  );
}
