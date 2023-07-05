import { apiPaths } from "@/api/apiPaths";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  availableBikes: [],
};

const nobookingSlice = createSlice({
  name: "nobooking",
  initialState,
  reducers: {
    searchBikesDataRequested: (nobooking, action) => {
      nobooking.loading = true;
    },
    searchBikesDataReceived: (nobooking, action) => {
      nobooking.loading = false;
      console.log(action.payload,'dd')
      nobooking.availableBikes = action.payload.results;
    },
    searchBikesDataRequestFailed: (nobooking, action) => {
      nobooking.loading = false;
    },
  },
});

const {
  searchBikesDataRequested,
  searchBikesDataReceived,
  searchBikesDataRequestFailed,
} = nobookingSlice.actions;

export default nobookingSlice.reducer;

export const postnobooking = (data:any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.nobooking.rentbooking}/${apiPaths.nobooking.nobooking}`,
    method: "post",
    data,
    onStart: searchBikesDataRequested.type,
    onSuccess: searchBikesDataReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
export const getnobooking = (id:any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.nobooking.rentbooking}/${apiPaths.nobooking.list}/${id}/${apiPaths.nobooking.NOBOOKING}`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: searchBikesDataReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
