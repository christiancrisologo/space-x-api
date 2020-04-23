import * as TYPES from "./actionTypes";

const initialState = {
  capsules: [],
  landingPad: [],
};

export default {
  spaceData: (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case TYPES.GET_CAPSULES_SUCCESS: {
        return {
          ...state,
          capsules: payload,
        };
      }
      case TYPES.LANDING_PAD_SUCCESS: {
        return {
          ...state,
          landingPad: payload,
        };
      }
      default:
        return state;
    }
  },
};
