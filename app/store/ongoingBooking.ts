import { apiPaths } from "@/api/apiPaths";
import { AppDispatch } from "@/types/DispatchType";
import { RootState } from "@/types/RootStateType";
import { Action, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { isAfter, parseISO } from "date-fns";
import { apiCallBegan } from "./api";
interface allProps {
  loading: boolean,
  allOngoingBookings: any[],
  todaysDrop: any[],
  extendedDrop: any[],
  futureDrop: any[],
  modifiedRequest: any[],
  completeBookingRequest: any[],
}


const initialState: allProps = {
  loading: false,
  allOngoingBookings: [],
  todaysDrop: [],
  extendedDrop: [],
  futureDrop: [],
  modifiedRequest: [],
  completeBookingRequest: [],
};

const ongoingBookingSlice = createSlice({
  name: "ongoingBooking",
  initialState,
  reducers: {
    ongoingBookingDataRequested: (ongoingBooking, action) => {
      ongoingBooking.loading = true;
    },
    ongoingBookingDataRequestFailed: (ongoingBooking, action) => {
      ongoingBooking.loading = false;
    },
    ongoingBookingDataReceived: (ongoingBooking, action) => {
      ongoingBooking.loading = false;
      ongoingBooking.allOngoingBookings = action.payload;
      ongoingBooking.todaysDrop = action.payload.filter((item: { [item: string]: object | any }) => new Date(item.endDate).getDate() === new Date().getDate()
        && new Date(item.endDate).getMonth() === new Date().getMonth() && new Date(item.endDate).getFullYear() === new Date().getFullYear()).sort((date1, date2) => new Date(date1.endDate).getTime() - new Date(date2.endDate).getTime())

      ongoingBooking.futureDrop = action.payload.filter((ite: { [ite: string]: object | any }) => new Date(ite.endDate) > new Date() && new Date(ite.endDate).getDate() !== new Date().getDate())
      .sort((date1, date2) => new Date(date1.endDate).getTime() - new Date(date2.endDate).getTime());

      ongoingBooking.extendedDrop = action.payload.filter((ite: { [ite: string]: object | any }) => new Date().getDate() !== new Date(ite.endDate).getDate() && new Date(ite.endDate) < new Date())
      .sort((date1, date2) => new Date(date1.endDate).getTime() - new Date(date2.endDate).getTime());
    },
    modifiedRequestReceived: (ongoingBooking, action) => {
      ongoingBooking.loading = false;
      ongoingBooking.modifiedRequest = action.payload;
    },
    completeBookingRequestReceived: (ongoingBooking, action) => {
      ongoingBooking.loading = false;
      ongoingBooking.completeBookingRequest = action.payload;
    },
  },
});

const {
  ongoingBookingDataReceived,
  ongoingBookingDataRequestFailed,
  ongoingBookingDataRequested,
  modifiedRequestReceived,
  completeBookingRequestReceived
} = ongoingBookingSlice.actions;

export default ongoingBookingSlice.reducer;

export const loadOngoingBookings = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/${apiPaths.rentBooking.ongoingBooking.list}/${id}/${apiPaths.rentBooking.ongoingBooking.ongoing}`,
    method: "get",
    onStart: ongoingBookingDataRequested.type,
    onError: ongoingBookingDataRequestFailed.type,
    onSuccess: ongoingBookingDataReceived.type,
  });
export const modifyBookingRequest = (formdata: any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/modifybookingrequest`,
    method: "post",
    data: formdata,
    onStart: ongoingBookingDataRequested.type,
    onError: ongoingBookingDataRequestFailed.type,
    onSuccess: modifiedRequestReceived.type,
  });
export const completeBookingRequest = (formdata: any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/request/complete`,
    method: "post",
    data: formdata,
    onStart: ongoingBookingDataRequested.type,
    onError: ongoingBookingDataRequestFailed.type,
    onSuccess: completeBookingRequestReceived.type,
  });

export const loadTodaysDrop =
  () => (dispatch: AppDispatch, getState: RootState) => {
    const {
      ongoingBooking: { todaysDrop },
    } = getState.entities;
  };

export const loadExtendedDrop =
  (): ThunkAction<void, RootState, undefined, Action> =>
    (dispatch, getState) => {
      const {
        ongoingBooking: { allOngoingBookings },
      } = getState().entities;
      const tempArr = [];

      // allOngoingBookings.map((item: any) => {
      //   console.log(isAfter(parseISO(item.startDate), parseISO(item.endDate)));
      // });
    };
// export const loadFutureDrop = () => () => {};
