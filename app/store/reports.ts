import { apiPaths } from "@/api/apiPaths";
import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash'
import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  rentpollList: [],
  allBookingbydate: [],
  cancelledBooking: [],
  offlineBooking: [],
  cancelledBookingoffline: [],
  cancelledBookingonline: [],
  onlineBooking: [],
  totalcancelledBuisness: 0,
  totalOfflineBuisness: 0,
  totalOnlineBuisness: 0,
  totalOnlineDiscount: 0,
  totalOfflineDiscount: 0,
  stores: [],
  brand: [],
  fixedformdata: {
    allBookingbydate: [],
    cancelledBooking: [],
    offlineBooking: [],
    cancelledBookingoffline: [],
    cancelledBookingonline: [],
    onlineBooking: [],
    totalcancelledBuisness: 0,
    totalOfflineBuisness: 0,
    totalOnlineBuisness: 0,
    totalOnlineDiscount: 0,
    totalOfflineDiscount: 0,
  },
  brandformdata: {
    allBookingbydate: [],
    cancelledBooking: [],
    offlineBooking: [],
    cancelledBookingoffline: [],
    cancelledBookingonline: [],
    onlineBooking: [],
    totalcancelledBuisness: 0,
    totalOfflineBuisness: 0,
    totalOnlineBuisness: 0,
    totalOnlineDiscount: 0,
    totalOfflineDiscount: 0,
  }
};

const reportsSlice = createSlice({
  name: "reportsSlice",
  initialState,
  reducers: {
    searchBikesDataRequested: (searchBikes) => {
      searchBikes.loading = true;
    },
    searchBikesDataRequestFailed: (searchBikes) => {
      searchBikes.loading = false;
    },
    allbookingbydateDataReceived: (searchBikes, action) => {
      searchBikes.allBookingbydate = action.payload.filter((ite: any) => ite.status !== "CANCELLED");
      searchBikes.cancelledBooking = action.payload.filter((ite: any) => ite.status === "CANCELLED");
      searchBikes.offlineBooking = action.payload.filter((ite: any) => ite.status !== "CANCELLED" && ite.bookingType === "OFFLINE");
      searchBikes.cancelledBookingoffline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "OFFLINE");
      searchBikes.cancelledBookingonline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "ONLINE");
      searchBikes.onlineBooking = action.payload.filter((ite: any) => ite.status !== "CANCELLED" && ite.bookingType === "ONLINE");
      searchBikes.totalOnlineBuisness = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOfflineBuisness = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalcancelledBuisness = searchBikes.cancelledBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineDiscount = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOfflineDiscount = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)

      searchBikes.fixedformdata.allBookingbydate = searchBikes.allBookingbydate
      searchBikes.fixedformdata.cancelledBooking = searchBikes.cancelledBooking
      searchBikes.fixedformdata.offlineBooking = searchBikes.offlineBooking
      searchBikes.fixedformdata.cancelledBookingoffline = searchBikes.cancelledBookingoffline
      searchBikes.fixedformdata.cancelledBookingonline = searchBikes.cancelledBookingonline
      searchBikes.fixedformdata.onlineBooking = searchBikes.onlineBooking
      searchBikes.fixedformdata.totalOnlineBuisness = searchBikes.totalOnlineBuisness
      searchBikes.fixedformdata.totalOfflineBuisness = searchBikes.totalOfflineBuisness
      searchBikes.fixedformdata.totalcancelledBuisness = searchBikes.totalcancelledBuisness
      searchBikes.fixedformdata.totalOnlineDiscount = searchBikes.totalOnlineDiscount
      searchBikes.fixedformdata.totalOfflineDiscount = searchBikes.totalOfflineDiscount

      searchBikes.loading = false;
    },
    rentpollListDataReceived: (searchBikes, action) => {
      searchBikes.loading = false;
      searchBikes.rentpollList = action.payload;
    },
    storesDataReceived: (searchBikes, action) => {
      searchBikes.loading = false;
      searchBikes.stores = action.payload;
    },
    brandsDataReceived: (searchBikes, action) => {
      searchBikes.loading = false;
      searchBikes.brand = action.payload;
    },
    brandNamewithBikeReceived: (searchBikes, action) => {
      searchBikes.allBookingbydate = searchBikes.fixedformdata.allBookingbydate.filter(ite => _.get(ite, "brand") === action.payload.brandName);
      searchBikes.offlineBooking = searchBikes.fixedformdata.offlineBooking.filter(ite => _.get(ite, "brand") === action.payload.brandName)
      searchBikes.onlineBooking = searchBikes.fixedformdata.onlineBooking.filter(ite => _.get(ite, "brand") === action.payload.brandName)
      searchBikes.totalOfflineBuisness = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineBuisness = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineDiscount = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOfflineDiscount = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)

      searchBikes.cancelledBooking = searchBikes.fixedformdata.cancelledBooking.filter(ite => _.get(ite, "brand") === action.payload.brandName);
      searchBikes.cancelledBookingoffline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "OFFLINE");
      searchBikes.cancelledBookingonline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "ONLINE");
      searchBikes.totalcancelledBuisness = searchBikes.cancelledBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      //brandformdata
      searchBikes.brandformdata.allBookingbydate = searchBikes.fixedformdata.allBookingbydate.filter(ite => _.get(ite, "brand") === action.payload.brandName);
      searchBikes.brandformdata.offlineBooking = searchBikes.fixedformdata.offlineBooking.filter(ite => _.get(ite, "brand") === action.payload.brandName)
      searchBikes.brandformdata.onlineBooking = searchBikes.fixedformdata.onlineBooking.filter(ite => _.get(ite, "brand") === action.payload.brandName)
      searchBikes.brandformdata.totalOfflineBuisness = searchBikes.brandformdata.offlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.brandformdata.totalOnlineBuisness = searchBikes.brandformdata.onlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.brandformdata.totalOnlineDiscount = searchBikes.brandformdata.onlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)
      searchBikes.brandformdata.totalOfflineDiscount = searchBikes.brandformdata.offlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)

      searchBikes.brandformdata.cancelledBooking = searchBikes.fixedformdata.cancelledBooking.filter(ite => _.get(ite, "brand") === action.payload.brandName);
      searchBikes.brandformdata.cancelledBookingoffline = searchBikes.brandformdata.cancelledBooking.filter((ite: any) => ite.bookingType === "OFFLINE");
      searchBikes.brandformdata.cancelledBookingonline = searchBikes.brandformdata.cancelledBooking.filter((ite: any) => ite.bookingType === "ONLINE");
      searchBikes.brandformdata.totalcancelledBuisness = searchBikes.brandformdata.cancelledBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)

      searchBikes.loading = false;
    },
    filterbyStore: (searchBikes, action) => {
      searchBikes.allBookingbydate = searchBikes.fixedformdata.allBookingbydate.filter(ite => _.get(ite, "location") === action.payload);
      searchBikes.offlineBooking = searchBikes.fixedformdata.offlineBooking.filter(ite => _.get(ite, "location") === action.payload)
      searchBikes.onlineBooking = searchBikes.fixedformdata.onlineBooking.filter(ite => _.get(ite, "location") === action.payload)
      searchBikes.totalOfflineBuisness = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineBuisness = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineDiscount = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOfflineDiscount = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)

      searchBikes.cancelledBooking = searchBikes.fixedformdata.cancelledBooking.filter(ite => _.get(ite, "location") === action.payload);
      searchBikes.cancelledBookingoffline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "OFFLINE");
      searchBikes.cancelledBookingonline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "ONLINE");
      searchBikes.totalcancelledBuisness = searchBikes.cancelledBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
    },
    filterbyModel: (searchBikes, action) => {
      searchBikes.allBookingbydate = searchBikes.brandformdata.allBookingbydate.filter(ite => _.get(ite, "model") === action.payload);
      searchBikes.offlineBooking = searchBikes.brandformdata.offlineBooking.filter(ite => _.get(ite, "model") === action.payload)
      searchBikes.onlineBooking = searchBikes.brandformdata.onlineBooking.filter(ite => _.get(ite, "model") === action.payload)
      searchBikes.totalOfflineBuisness = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineBuisness = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineDiscount = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOfflineDiscount = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)

      searchBikes.cancelledBooking = searchBikes.brandformdata.cancelledBooking.filter(ite => _.get(ite, "model") === action.payload);
      searchBikes.cancelledBookingoffline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "OFFLINE");
      searchBikes.cancelledBookingonline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "ONLINE");
      searchBikes.totalcancelledBuisness = searchBikes.cancelledBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
    },
    filterbyRegNo: (searchBikes, action) => {
      searchBikes.allBookingbydate = searchBikes.brandformdata.allBookingbydate.filter(ite => _.get(ite, "_rentPoolKey.registrationNumber") === action.payload);
      searchBikes.offlineBooking = searchBikes.brandformdata.offlineBooking.filter(ite => _.get(ite, "_rentPoolKey.registrationNumber") === action.payload)
      searchBikes.onlineBooking = searchBikes.brandformdata.onlineBooking.filter(ite => _.get(ite, "_rentPoolKey.registrationNumber") === action.payload)
      searchBikes.totalOfflineBuisness = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineBuisness = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOnlineDiscount = searchBikes.onlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)
      searchBikes.totalOfflineDiscount = searchBikes.offlineBooking.map((ite: any) => _.get(ite, "discountGiven")).reduce((p, c) => { return p + c }, 0)

      searchBikes.cancelledBooking = searchBikes.brandformdata.cancelledBooking.filter(ite => _.get(ite, "_rentPoolKey.registrationNumber") === action.payload);
      searchBikes.cancelledBookingoffline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "OFFLINE");
      searchBikes.cancelledBookingonline = searchBikes.cancelledBooking.filter((ite: any) => ite.bookingType === "ONLINE");
      searchBikes.totalcancelledBuisness = searchBikes.cancelledBooking.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0)
    },
  },
});

const {
  searchBikesDataRequested,
  allbookingbydateDataReceived,
  searchBikesDataRequestFailed,
  rentpollListDataReceived,
  storesDataReceived,
  brandsDataReceived,
  brandNamewithBikeReceived
} = reportsSlice.actions;

export default reportsSlice.reducer;
export const { filterbyModel,filterbyRegNo,filterbyStore } = reportsSlice.actions
export const getRentPoolAllList = () =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.reports.rentpool}/${apiPaths.reports.alllist}`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: rentpollListDataReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
export const getallbookingbydate = (startDate: number, endDate: number) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.reports.rentbooking}/${apiPaths.reports.allbookingbydate}/${startDate}/${endDate}`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: allbookingbydateDataReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
export const getallStores = () =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.reports.stores}`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: storesDataReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
export const getallBrandlists = () =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.reports.brand}/${apiPaths.reports.list}`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: brandsDataReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
export const getbrandNamewithBike = (brandName: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.reports.brand}/${brandName}`,
    method: "get",
    onStart: searchBikesDataRequested.type,
    onSuccess: brandNamewithBikeReceived.type,
    onError: searchBikesDataRequestFailed.type,
  });
