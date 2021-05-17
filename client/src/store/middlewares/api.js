import axios from "axios";
import { apiCallBegan, apiCallFailed, apiCallSucceded } from "../actions/api";

export const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

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
      dispatch(apiCallSucceded());
      // Specific success aciont
      if (onSuccess) return dispatch(onSuccess(response.data));
    } catch ({ response }) {
      // General failure action
      dispatch(apiCallFailed());
      // Specific failure action
      if (onFailure) return dispatch(onFailure(response.data));
    }
  };

export default api;
