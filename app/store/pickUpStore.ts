import { apiPaths } from "@/api/apiPaths";
import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";
interface allProps {
    loading: boolean,
    allpickUps: any[],
    todayspickUp: any,
    overduepickUp: any[],
    futurepickUp: any[],
    modifiedRequest: any[],
    cancelrequestRentBookingData: any,
    transferRentbooking: any[],
    fetchBikestransferRentbooking: any,
    UserbyMobileNo: any,
    rentbookinguserOngoing: any,
    rentpoolList: any,
    webuserupdate: any,
}

interface cancelProps {
    data: any,
    id: string|undefined
}

interface Props {
    startDate: any;
    endDate: any;
    Bikemodel?: any;
    city?:string
}
const initialState: allProps = {
    loading: false,
    allpickUps: [],
    todayspickUp: [],
    overduepickUp: [],
    futurepickUp: [],
    modifiedRequest: [],
    cancelrequestRentBookingData: {},
    transferRentbooking: [],
    fetchBikestransferRentbooking: [],
    rentbookinguserOngoing: [],
    UserbyMobileNo: {},
    rentpoolList: [],
    webuserupdate:{}
};
const pickUpSlice = createSlice({
    name: "pickUp",
    initialState,
    reducers: {
        pickUpDataRequested: (pickUp, action) => {
            pickUp.loading = true;
        },
        pickUpDataRequestFailed: (pickUp, action) => {
            pickUp.loading = false;
        },
        pickUpDataReceived: (pickUp, action) => {
            pickUp.loading = false;
            pickUp.allpickUps = action.payload;
            pickUp.todayspickUp = pickUp.allpickUps.filter((item: { [item: string]: object | any }) => new Date(item.startDate).getDate() === new Date().getDate()
                && new Date(item.startDate).getMonth() === new Date().getMonth() && new Date(item.startDate).getFullYear() === new Date().getFullYear()).sort((date1, date2) => new Date(date1.startDate).getTime() - new Date(date2.startDate).getTime())
            pickUp.futurepickUp = action.payload.filter((ite: { [ite: string]: object | any }) => new Date(ite.startDate) > new Date() && new Date(ite.startDate).getDate() !== new Date().getDate())
                .sort((date1, date2) => new Date(date1.startDate).getTime() - new Date(date2.startDate).getTime());

            pickUp.overduepickUp = action.payload.filter((ite: { [ite: string]: object | any }) => new Date().getDate() !== new Date(ite.startDate).getDate() && new Date(ite.startDate) < new Date())
                .sort((date1, date2) => new Date(date1.startDate).getTime() - new Date(date2.startDate).getTime());
        },
        modifiedRequestReceived: (pickUp, action) => {
            pickUp.loading = false;
            pickUp.modifiedRequest = action.payload;
        },
        cancelrequestpickupDataReceived: (pickUp, action) => {
            pickUp.loading = false;
            pickUp.cancelrequestRentBookingData = action.payload;
        },

        transferRentbookingDataReceived: (pickUp, action) => {
            pickUp.loading = false;
            pickUp.transferRentbooking = action.payload;
        },
        fetchBikestransferRentbookingDataReceived: (pickUp, action) => {
            pickUp.loading = false;
            pickUp.fetchBikestransferRentbooking = action.payload;
        },
        rentbookinguserOngoingReceived: (pickUp, action) => {
            pickUp.loading = false;
            pickUp.rentbookinguserOngoing = action.payload.data;
        },
        UserbyMobileNoReceived: (pickUp, action) => {
            pickUp.loading = false;
            pickUp.UserbyMobileNo = action.payload;
        },
        rentpoolListReceived: (createBooking, action) => {
            createBooking.loading = false;
            createBooking.rentpoolList = action.payload;
        },
        webuserupdateRecieved: (createBooking, action) => {
            createBooking.loading = false;
            createBooking.webuserupdate = action.payload;
        },
    },
});

const {
    pickUpDataReceived,
    pickUpDataRequestFailed,
    pickUpDataRequested,
    modifiedRequestReceived,
    cancelrequestpickupDataReceived,
    fetchBikestransferRentbookingDataReceived,
    transferRentbookingDataReceived,
    rentbookinguserOngoingReceived,
    UserbyMobileNoReceived,
    rentpoolListReceived,
    webuserupdateRecieved
} = pickUpSlice.actions;

export default pickUpSlice.reducer;

export const getallPickups = (id: string) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/list/${id}/BOOKED`,
        method: "get",
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: pickUpDataReceived.type,
    });
export const cancelrequestRentBooking = ({ data, id }: cancelProps) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/request/cancel/${id}`,
        method: "post",
        data,
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: cancelrequestpickupDataReceived.type,
    });
export const transferrequestRentBooking = ({ data, id }: cancelProps) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/transfer/${id}`,
        method: "post",
        data,
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: transferRentbookingDataReceived.type,
    });
export const getUserbyMobileNo = (mobilenotofetch: any) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1}/getwebuser/` + mobilenotofetch,
        method: "get",
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: UserbyMobileNoReceived.type,
    });
export const getrentbookinguserOngoing = (userId: string) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/userOnGoing/${userId}`,
        method: "get",
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: rentbookinguserOngoingReceived.type,
    });
export const fetchBikestotransferBookings = ({ startDate, endDate, Bikemodel, city }: Props) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1
            }/rent/search/${city}/${Bikemodel.brand}/${Bikemodel.modelName}/any/?start_date=${startDate}&end_date=${endDate}&timezone=Asia/Calcutta`,
        method: "get",
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: fetchBikestransferRentbookingDataReceived.type,
    });
export const getrentpoolList = (id: string) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1}/rent-pool/list/${id}`,
        method: "get",
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: rentpoolListReceived.type,
    });
export const modifyBookingRequest = (formdata: any) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/modifybookingrequest`,
        method: "post",
        data: formdata,
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: modifiedRequestReceived.type,
    });
export const webuserupdatedetails = (formdata: any) =>
    apiCallBegan({
        url: `/${apiPaths.version.v1}/webuser/updatedetails`,
        method: "post",
        data: formdata,
        onStart: pickUpDataRequested.type,
        onError: pickUpDataRequestFailed.type,
        onSuccess: webuserupdateRecieved.type,
    });

