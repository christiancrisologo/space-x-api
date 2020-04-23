import axios from "axios";
import * as TYPES from "./actionTypes";

const END_POINT = "http://192.168.99.102:4000";

const getUpcomingCapsules = (dispatch) => {
  axios
    .get(`${END_POINT}/upcoming-capsules`, { crossdomain: true })
    .then((response) => {
      dispatch({
        type: TYPES.GET_CAPSULES_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch((error) => dispatch({ type: TYPES.API_ERROR, payload: error }));
};

export default { getUpcomingCapsules };
