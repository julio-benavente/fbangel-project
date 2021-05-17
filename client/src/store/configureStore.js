import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import auth from "./middlewares/auth";
import api from "./middlewares/api";

export default () =>
  configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({ serializableCheck: false }),
      auth,
      api,
    ],
  });
