import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSucceded = createAction("api/callSucceeded");
export const apiCallFailed = createAction("api/callFailed");
