import axios from "axios";
import {
  authRequestBegan,
  authRequestSucceded,
  authRequestFailed,
} from "../actions/auth";

export const auth =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== authRequestBegan.type) return next(action);

    next(action);

    const { onStart, onSuccess, onFailure, method, url, data } = action.payload;

    if (onStart) dispatch(onStart());

    try {
      const response = await axios.request({
        url,
        method,
        data,
      });

      // General success action
      dispatch(authRequestSucceded());
      // Specific success aciont
      if (onSuccess) return dispatch(onSuccess(response.data));
    } catch ({ response }) {
      // General failure action
      dispatch(authRequestFailed());
      // Specific failure action
      if (onFailure) return dispatch(onFailure(response.data));
    }
  };

export default auth;
