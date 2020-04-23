import * as TYPES from "./actionTypes";

const initialState = {
  capsules: [],
  landingPad: [],
  consoleData: "",
  apiBusy: false,
};

export default {
  spaceData: (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case TYPES.API_BUSY: {
        return { ...state, apiBusy: payload };
      }
      case TYPES.API_ERROR: {
        return { ...state, apiBusy: false };
      }
      case TYPES.GET_CAPSULES_SUCCESS: {
        return {
          ...state,
          capsules: payload,
          consoleData: JSON.stringify(payload, undefined, 2),
          apiBusy: false,
        };
      }
      case TYPES.LANDING_PAD_SUCCESS: {
        return {
          ...state,
          landingPad: payload,
          consoleData: JSON.stringify(payload, undefined, 2),
          apiBusy: false,
        };
      }
      default:
        return state;
    }
  },
};
