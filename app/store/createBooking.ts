import { apiPaths } from "@/api/apiPaths";
import { createSlice } from "@reduxjs/toolkit";
import { ToastAndroid } from "react-native";
import { apiCallBegan } from "./api";
type allProps = {
  loading: boolean,
  assignVisible: boolean,
  allfetchBikes: any,
  user: any,
  userToken: string,
  failedMsg: string,
  otpSent: boolean,
  otpData: any,
  immediateCheckout: boolean,
  otpVerifyDone: boolean,
  rentBookingDetails?: any;
  updaterentBookingDetails?: any;
  offlineBookingDetails?: any;
  rentbookingListBooked: any,
  rentbookinguserOngoing: any[],
  rentpoolList: any[],
  coupenList: any[],
  UserbyMobileNo: any,
  stepCountValue: number,
  formdataforCheckIn: { [key: string]: string | boolean | { [key: string]: string } },
 
  createBookingPay: any,
  fetchBikestransferRentbooking: any[],
};
const initialState: allProps = {
  loading: false,
  assignVisible: false,
  allfetchBikes: [],
  user: null,
  userToken: "",
  failedMsg: "",
  stepCountValue: -1,
  otpSent: false,
  otpData: {},
  immediateCheckout: false,
  otpVerifyDone: false,
  rentBookingDetails: {},
  updaterentBookingDetails: {},
  offlineBookingDetails: {},
  rentbookingListBooked: [],
  rentbookinguserOngoing: [],
  rentpoolList: [],
  coupenList: [],
  UserbyMobileNo: {},
  createBookingPay: {},
  formdataforCheckIn: {
    address: "",
    usergst: "",
    startingkm: "",
    helmet: false,
    checked: false,
    selectVehicle: {}
  },
  fetchBikestransferRentbooking: [],
};

interface Props {
  startDate: any;
  endDate: any;
  Bikemodel?: any;
  storeName?: any;
  city?: string
}
interface formdataProps {
  formdata: any;
}
const createBookingSlice = createSlice({
  name: "createBooking",
  initialState,
  reducers: {
    createBookingDataRequested: (createBooking, action) => {
      createBooking.loading = true;
    },
    createBookingDataRequestFailed: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.failedMsg = action.payload.message;
    },
    createBookingDataReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.createBookingPay = action.payload;
      createBooking.offlineBookingDetails = action.payload[0] || action.payload
      ToastAndroid.show('Booking Created Successfully', ToastAndroid.SHORT)
    },
    fetchBikesDataReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.allfetchBikes = action.payload.results;
    },
    fetchBikestransferRentbookingDataReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.fetchBikestransferRentbooking = action.payload.results;
    },
    otpDataReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.otpData = action.payload;
      createBooking.otpSent = action.payload.success;
      createBooking.otpVerifyDone = action.payload.user ? true : false;
    },
    userDataafterLoginReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.user = action.payload;
    },
    UserbyMobileNoReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.UserbyMobileNo = action.payload;
    },
    rentbookingListBookedReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.rentbookingListBooked = action.payload;
    },
    updaterentBookingDetailsReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.updaterentBookingDetails = action.payload;
    },
    rentbookinguserOngoingReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.rentbookinguserOngoing = action.payload.data;
    },
    rentpoolListReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.rentpoolList = action.payload;
      createBooking.assignVisible = true;
    },
    coupenListReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.coupenList = action.payload;
    },
    rentBookingDetailsReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.rentBookingDetails = action.payload;
    },

    // without url actions
    createBookingPayDataReceived: (createBooking, action) => {
      createBooking.offlineBookingDetails = action.payload[0] || action.payload;
    },
    userDataReceived: (createBooking, action) => {
      createBooking.loading = false;
      createBooking.user = action.payload;
    },
    cleanonGoingbooking: (createBooking) => {
      createBooking.assignVisible = false;
      createBooking.otpSent = false;
      createBooking.otpVerifyDone = false;
      createBooking.UserbyMobileNo = {};
      createBooking.offlineBookingDetails = {};
      createBooking.immediateCheckout = false;
      createBooking.rentbookinguserOngoing = [];
      createBooking.allfetchBikes = [];
      createBooking.stepCountValue = -1;
      createBooking.failedMsg = "";
      createBooking.formdataforCheckIn = {
        address: "",
        usergst: "",
        startingkm: "",
        helmet: false,
        checked: false,
        selectVehicle: {}
      };
    },
    userTokensaveToReducers: (createBooking, action) => {
      createBooking.userToken = action.payload;
    },
    clearFailedMsg: (createBooking) => {
      createBooking.failedMsg = "";
      createBooking.otpSent = false;
    },
    stepCountValuesaveToReducers: (createBooking, action) => {
      createBooking.stepCountValue = action.payload;
    },
    toggleImmediacheckout: (createBooking) => {
      createBooking.immediateCheckout = !createBooking.immediateCheckout;
    },
    formdataforCheckInData: (createBooking, action) => {
      createBooking.formdataforCheckIn = action.payload;
    },
  },
});

const {
  createBookingDataReceived,
  createBookingDataRequestFailed,
  createBookingDataRequested,
  fetchBikesDataReceived,
  UserbyMobileNoReceived,
  otpDataReceived,
  rentbookingListBookedReceived,
  userDataafterLoginReceived,
  rentbookinguserOngoingReceived,
  rentpoolListReceived,
  coupenListReceived,
  rentBookingDetailsReceived,
  updaterentBookingDetailsReceived,
  fetchBikestransferRentbookingDataReceived
} = createBookingSlice.actions;

export default createBookingSlice.reducer;
export const { formdataforCheckInData, clearFailedMsg, stepCountValuesaveToReducers, cleanonGoingbooking, toggleImmediacheckout,
  userTokensaveToReducers, createBookingPayDataReceived,
  userDataReceived, } = createBookingSlice.actions
export const fetchBikestocreateBookings = ({ startDate, endDate, Bikemodel, storeName, city }: Props) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1
      }/rent/search/${city}/${Bikemodel ? Bikemodel.brand : 'any'}/${Bikemodel ? Bikemodel.modelName : 'any'}/${storeName}/?start_date=${startDate
      }&end_date=${endDate}&timezone=Asia/Calcutta`,
    method: "get",
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: fetchBikesDataReceived.type,
  });
export const fetchBikestotransferBookings = ({ startDate, endDate, Bikemodel, city }: Props) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1
      }/rent/search/${city}/${Bikemodel.brand}/${Bikemodel.modelName}/any/?start_date=${startDate}&end_date=${endDate}&timezone=Asia/Calcutta`,
    method: "get",
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: fetchBikestransferRentbookingDataReceived.type,
  });
export const sendOtptoUser = ({ formdata }: formdataProps) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/sendOTP`,
    method: "post",
    data: formdata,
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: otpDataReceived.type,
  });
export const userLogin = (formdata: any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/login`,
    method: "post",
    data: formdata,
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: userDataafterLoginReceived.type,
  });
export const userotpVerify = ({ formdata }: formdataProps) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/verifyOTP`,
    method: "post",
    data: formdata,
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: otpDataReceived.type,
  });
export const getUserbyMobileNo = (mobilenotofetch: any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/getwebuser/` + mobilenotofetch,
    method: "get",
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: UserbyMobileNoReceived.type,
  });
export const getrentpoolList = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/rent-pool/list/${id}`,
    method: "get",
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: rentpoolListReceived.type,
  });
export const getCoupenList = () =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/coupen-code/list`,
    method: "get",
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: coupenListReceived.type,
  });
export const createBookingPay = (formdata: any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/offline`,
    method: "post",
    data: formdata,
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: createBookingDataReceived.type,
  });
export const getrentbookingListBooked = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/list/${id}/BOOKED`,
    method: "get",
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: rentbookingListBookedReceived.type,
  });
export const getrentbookinguserOngoing = (userId: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/userOnGoing/${userId}`,
    method: "get",
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: rentbookinguserOngoingReceived.type,
  });
export const getsinglerentbooking = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/details/${id}`,
    method: "get",
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: rentBookingDetailsReceived.type,
  });
export const updateRentBooking = (data: any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/updateRentBooking`,
    method: "put",
    data,
    onStart: createBookingDataRequested.type,
    onError: createBookingDataRequestFailed.type,
    onSuccess: updaterentBookingDetailsReceived.type,
  });


