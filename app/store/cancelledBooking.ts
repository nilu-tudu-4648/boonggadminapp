import { apiPaths } from "@/api/apiPaths";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  allCancelledBooking: [],
};

const cancelledBooking = createSlice({
  name: "cancelledBooking",
  initialState,
  reducers: {
    cancelledBookingDataRequested: (cancelledBooking, action) => {
      cancelledBooking.loading = true;
    },
    cancelledBookingDataReceived: (cancelledBooking, action) => {
      cancelledBooking.loading = false;
      cancelledBooking.allCancelledBooking = action.payload;
    },
    cancelledBookingDataRequestFailed: (cancelledBooking, action) => {
      cancelledBooking.loading = false;
    },
  },
});

const {
  cancelledBookingDataReceived,
  cancelledBookingDataRequestFailed,
  cancelledBookingDataRequested,
} = cancelledBooking.actions;

export default cancelledBooking.reducer;

export const loadCancelledBooking = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/${apiPaths.rentBooking.cancelledBooking.list}/${id}/${apiPaths.rentBooking.cancelledBooking.cancelled}`,
    onStart: cancelledBookingDataRequested.type,
    onSuccess: cancelledBookingDataReceived.type,
    onError: cancelledBookingDataRequestFailed.type,
  });
