import { createAction } from "@reduxjs/toolkit";

export const authRequestBegan = createAction("auth/requestBegan");
export const authRequestSucceded = createAction("auth/requestSucceeded");
export const authRequestFailed = createAction("auth/requestFailed");
