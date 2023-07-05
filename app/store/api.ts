import { createAction } from "@reduxjs/toolkit";

interface ApiCallBegan {
  url: string;
  method?: "get" | "post" | "put" | "patch";
  onStart: string;
  onSuccess: string;
  onError: string;
  data?: object;
}

export const apiCallBegan = createAction<ApiCallBegan>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<any>("api/callFailed");
