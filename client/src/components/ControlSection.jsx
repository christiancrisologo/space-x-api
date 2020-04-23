import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import actions from "../redux/actions";
import { ReactComponent as Rocket } from "../assets/rocket.svg";
import { mediaQuery, colors } from "../theme";

const Container = styled.div`
  background-color: ${colors.secondaryBgColor};
  display: flex;
  padding: 12px;
  display: flex;
  height: 100%;
  align-items: center;

  ${mediaQuery.desktop} {
    margin: auto auto;
    width: 50% !important;
    height: 20%;
    flex-direction: row;
    overflow: auto;
    margin-top: 0;
    input {
      font-size: 16px;
      margin-right: 12px;
      height: 38px !important;
      padding: 0 12px;
    }
    button {
      min-width: 100px !important;
    }
    svg {
      margin: 12px !important;
      min-width: 30px;
      margin-top: 0px !important;
    }
    align-items: space-between;
  }

  ${mediaQuery.smMobile} {
    width: 20%;
    flex-direction: column;
    margin-left: 8px;
    input {
      font-size: 12px;
      margin-left: ;
    }
    svg {
      height: 28px;
      width: 28px;
    }
  }

  ${mediaQuery.mobile} {
    width: 25% !important;
    flex-direction: column;
    margin-left: 8px;
    input {
      font-size: 12px;
    }
    svg {
      height: 28px;
      width: 28px;
    }
  }

  button,
  input {
    width: 100%;
    height: 40px;
    margin-bottom: 12px;
    border: 1px solid ${colors.textSecondaryColor};
    background-color: white;
    border-radius: 5%;
  }
  button {
    cursor: pointer;
    :disabled,
    [disabled] {
      cursor: default;
      color: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
  svg {
    margin: 12px auto;
    display: flex;
    animation: rotateOut 3s infinite;
  }

  @keyframes rotateOut {
    0% {
      transform-origin: center;
    }

    50% {
      transform-origin: center;
      transform: rotate3d(0, 0, 1, -100deg);
    }

    100% {
      transform-origin: center;
    }
  }
`;

export default function () {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = React.useState("");
  const [inputIsValid, setInputIsValid] = React.useState(false);

  React.useEffect(() => {
    actions.getUpcomingCapsules(dispatch);
  }, []);

  const capsulesHandler = React.useCallback(() => {
    actions.getUpcomingCapsules(dispatch);
  }, [dispatch]);

  const searchInputChange = React.useCallback((e) => {
    const newValue = e.target.value || "";
    const isValid =
      ![null, undefined, ""].includes(newValue) &&
      !/[‘#’,’$’,’%’,’&’]/.test(newValue);
    setInputIsValid(isValid);
    setSearchInput(newValue);
  }, []);

  const searchHandler = React.useCallback(
    (e) => {
      actions.getLandingPad(searchInput)(dispatch);
    },
    [searchInput]
  );

  return (
    <Container>
      <button onClick={capsulesHandler}>Capsules</button>
      <Rocket />
      <input
        name="search-landing-pad"
        maxlength="15"
        type="text"
        value={searchInput}
        onChange={searchInputChange}
      />
      <button onClick={searchHandler} disabled={!inputIsValid}>
        Landing Pad
      </button>
    </Container>
  );
}
