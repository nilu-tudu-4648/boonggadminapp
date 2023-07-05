import { apiPaths } from "@/api/apiPaths";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  availableBikes: [],
  storeDetail: {},
  storeName: "",
  currentCity: {},
};

const searchBikesSlice = createSlice({
  name: "searchBikes",
  initialState,
  reducers: {
    searchBikesDataRequested: (searchBikes, action) => {
      searchBikes.loading = true;
    },
    searchBikesDataReceived: (searchBikes, action) => {
      searchBikes.loading = false;
      searchBikes.availableBikes = action.payload.results;
    },
    storeNameDataReceived: (searchBikes, action) => {
      searchBikes.loading = false;
      searchBikes.storeName = action.payload[0];
    },
    searchBikesDataRequestFailed: (searchBikes, action) => {
      searchBikes.loading = false;
    },
    saveStoredata: (searchBikes, action) => {
      searchBikes.storeDetail = action.payload;
    },
    currentCityDetailsReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.currentCity = action.payload;
    },
  },
});

const {
  searchBikesDataRequested,
  searchBikesDataReceived,
  searchBikesDataRequestFailed,
  storeNameDataReceived,
  currentCityDetailsReceived
} = searchBikesSlice.actions;

export default searchBikesSlice.reducer;
export const { saveStoredata } = searchBikesSlice.actions
export const loadSearchedBikes = (startDate: number, endDate: number) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.search.rent}/${apiPaths.search.name}/${apiPaths.search.city}/Bajaj/Pulsar%20150/any/?${apiPaths.search.startDate}=${startDate}&${apiPaths.search.endDate}=${endDate}&timezone=Asia/Calcutta`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: searchBikesDataReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
export const getStorebyid = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/store/locality/${id}`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: storeNameDataReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
export const getCityDetails = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.storeforid}/${id}`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: currentCityDetailsReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
