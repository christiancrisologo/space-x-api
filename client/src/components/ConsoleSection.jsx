import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import { mediaQuery, colors } from "../theme";
import Preloader from "../components/Preloader";
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

  ${mediaQuery.smMobile} {
    width: 60%;
    height: 100%;
  }

  ${mediaQuery.mobile} {
    width: 66%;
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
  const { consoleData, apiBusy } = useSelector((state) => state.spaceData);
  console.log("#CC consoleData ", consoleData);
  React.useEffect(() => {
    actions.getUpcomingCapsules(dispatch);
  }, []);

  return (
    <Container>
      {apiBusy ? (
        <Preloader />
      ) : (
        <textarea
          id="consoleTextArea"
          value={consoleData}
          cols="50"
          rows="50"
        ></textarea>
      )}
    </Container>
  );
}
