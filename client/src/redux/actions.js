import axios from "axios";
import * as TYPES from "./actionTypes";

const END_POINT = "http://192.168.99.102:4000";

const getUpcomingCapsules = (dispatch) => {
  dispatch({ type: TYPES.API_BUSY, payload: true });
  axios
    .get(`${END_POINT}/upcoming-capsules`, { crossdomain: true })
    .then((response) => {
      dispatch({
        type: TYPES.GET_CAPSULES_SUCCESS,
        payload: (response.data.result || []).sort((a, b) => {
          const dateA = a.original_launch ? new Date(a.original_launch) : 0;
          const dateB = b.original_launch ? new Date(b.original_launch) : 0;
          return dateA - dateB;
        }),
      });
    })
    .catch((error) => dispatch({ type: TYPES.API_ERROR, payload: error }));
};

const getLandingPad = (key) => (dispatch) => {
  dispatch({ type: TYPES.API_BUSY, payload: true });
  axios
    .get(`${END_POINT}/landing-pad/${key}`, { crossdomain: true })
    .then((response) => {
      dispatch({
        type: TYPES.LANDING_PAD_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch((error) => dispatch({ type: TYPES.API_ERROR, payload: error }));
};

export default { getUpcomingCapsules, getLandingPad };
