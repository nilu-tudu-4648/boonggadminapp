import { apiPaths } from "@/api/apiPaths";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import _ from "lodash";

interface allProps {
  loading: boolean,
  allRentPool: any[],
  allBikesList: any[],
  allBikesListMaintenance: any[],
  allBikesAvailableandBookedandMaintenance: any[],
  updateRentBookingtoMaintenanceData: any[],
  rentPooldelete: any[],
  singleRentPoll: any[],
  brandsRentPoll: any[],
  listofBrands: any[],
  updateRentPooliddata: any[],
  unblockRentPooliddata: any[],
  addRentPooldata: any[],
  updatePricerentbikes: any[],
  rentBike: string | any[],
  priceChart: any
  allAvailablerentPool: any[]
  allBookedrentPool: any[]
}

const initialState: allProps = {
  loading: false,
  allRentPool: [],
  allBikesList: [],
  allBikesListMaintenance: [],
  allBikesAvailableandBookedandMaintenance: [],
  updateRentBookingtoMaintenanceData: [],
  rentPooldelete: [],
  singleRentPoll: [],
  brandsRentPoll: [],
  listofBrands: [],
  updateRentPooliddata: [],
  unblockRentPooliddata: [],
  addRentPooldata: [],
  updatePricerentbikes: [],
  rentBike: 'null',
  priceChart: {
    "extraHRS": 0,
    "extraKMS": 0,
    "fifteenDays": 0,
    "fiveDayRate": 0,
    "fourDayRate": 0,
    "hourlyRate": 0,
    "isAdminRentApplied": true,
    "kmsLimit": 0,
    "monthly": 0,
    "sevenDayRate": 0,
    "sixDayRate": 0,
    "tenDayRate": 0,
    "threeDayRate": 0,
    "twentyDayRate": 0,
    "twoDayRate": 0,
    "weekdays": 0,
    "weekend": 0,
  },
  allAvailablerentPool: [],
  allBookedrentPool: [],
};

const rentPoolSlice = createSlice({
  name: "rentPool",
  initialState,
  reducers: {
    rentPoolDataRequested: (rentPool, action) => {
      rentPool.loading = true;
      rentPool.rentBike = 'null';
    },
    rentPoolDataReceived: (rentPool, action) => {
      rentPool.allRentPool = action.payload.docs || action.payload;
      const idmaintancedata = rentPool.allBikesListMaintenance.filter(ite => _.get(ite, "_rentPoolKey._id")).map(ite => _.get(ite, "_rentPoolKey._id"))
      rentPool.allAvailablerentPool = rentPool.allRentPool.filter((ite: any) => ite.statusType.type === "AVAILABLE").filter((item:any) => !idmaintancedata.includes(item._id))
      rentPool.allBookedrentPool = rentPool.allRentPool.filter((ite: any) => ite.statusType.type === "BOOKED").filter((item:any) => !idmaintancedata.includes(item._id))
      rentPool.loading = false;
    },
    rentPoolDataRequestFailed: (rentPool, action) => {
      rentPool.loading = false;
    },
    allBikesListDataRequested: (bikesList, action) => {
      bikesList.loading = true;
    },
    allBikesListDataReceived: (bikesList, action) => {
      bikesList.allBikesList = action.payload;
      bikesList.loading = false;
    },
    allBikesListMaintenanceDataReceived: (bikesList, action) => {
      bikesList.allBikesListMaintenance = action.payload;
      bikesList.loading = false;
    },
    allBikesListDataRequestFailed: (bikesList, action) => {
      bikesList.loading = false;
    },
    updateRentBookingtoMaintenanceDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.updateRentBookingtoMaintenanceData = action.payload;
    },
    rentPooldeleteDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.rentPooldelete = action.payload;
    },
    getSingleRentPoolDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.singleRentPoll = action.payload;
    },
    brandsRentPollDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.singleRentPoll = action.payload;
    },
    listofBrandsDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.listofBrands = action.payload;
    },
    updateRentPoolidDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.updateRentPooliddata = action.payload;
    },
    unblockRentPooliddataDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.unblockRentPooliddata = action.payload;
    },
    addRentPooldataDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.addRentPooldata = action.payload;
    },
    updatePricerentbikesDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.updatePricerentbikes = action.payload;
    },
    rentBikeDataRecieved: (bikesList, action) => {
      bikesList.loading = false;
      bikesList.rentBike = action.payload[0];
      if (action.payload[0].location[0]) {
        bikesList.priceChart = action.payload[0].location[0].priceChart
      }
    },
    //without api and url actions 
    setBikesAvailableandBookedData: (bikesList, action) => {
      bikesList.allBikesAvailableandBookedandMaintenance = action.payload
    },
    setallAvailablerentPoolData: (bikesList, action) => {
      bikesList.allAvailablerentPool = action.payload
    },
    setallBookedrentPoolData: (bikesList, action) => {
      bikesList.allBookedrentPool = action.payload
    }
  },
});

const {
  rentPoolDataReceived,
  rentPoolDataRequestFailed,
  rentPoolDataRequested,
  allBikesListDataReceived,
  allBikesListDataRequested,
  allBikesListDataRequestFailed,
  allBikesListMaintenanceDataReceived,
  updateRentBookingtoMaintenanceDataRecieved,
  rentPooldeleteDataRecieved,
  getSingleRentPoolDataRecieved,
  brandsRentPollDataRecieved,
  listofBrandsDataRecieved,
  updateRentPoolidDataRecieved,
  unblockRentPooliddataDataRecieved,
  addRentPooldataDataRecieved,
  updatePricerentbikesDataRecieved,
  rentBikeDataRecieved
} = rentPoolSlice.actions;

export default rentPoolSlice.reducer;
export const { setBikesAvailableandBookedData, setallAvailablerentPoolData, setallBookedrentPoolData } = rentPoolSlice.actions
export const loadAllRentPool = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentPool.name}/${apiPaths.rentPool.allListStore}/${id}?page=1&limit=10000`,
    method: "get",
    onStart: rentPoolDataRequested.type,
    onSuccess: rentPoolDataReceived.type,
    onError: rentPoolDataRequestFailed.type,
  });

export const loadAllBikesList = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.allBikesList.name}/${apiPaths.allBikesList.list}/${id}`,
    method: "get",
    onStart: allBikesListDataRequested.type,
    onSuccess: allBikesListDataReceived.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const loadAllBikesListMaintenance = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/rentbooking/${apiPaths.allBikesList.list}/${id}/BLOCKED/MAINTENANCE`,
    method: "get",
    onStart: allBikesListDataRequested.type,
    onSuccess: allBikesListMaintenanceDataReceived.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const updateRentBookingtoMaintenance = (data: any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/rentbooking/block`,
    method: "post",
    data,
    onStart: allBikesListDataRequested.type,
    onSuccess: updateRentBookingtoMaintenanceDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const addRentPool = (data: any) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentPool.name}/add`,
    method: "post",
    data,
    onStart: allBikesListDataRequested.type,
    onSuccess: addRentPooldataDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const deleteRentPool = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentPool.delete}/${id}`,
    method: "get",
    onStart: allBikesListDataRequested.type,
    onSuccess: rentPooldeleteDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const getSingleRentPool = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentPool.name}/${id}`,
    method: "get",
    onStart: allBikesListDataRequested.type,
    onSuccess: getSingleRentPoolDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const getBrandsofRentPool = (brand: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/brand/${brand}`,
    method: "get",
    onStart: allBikesListDataRequested.type,
    onSuccess: brandsRentPollDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const getListBrandsRentPool = () =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/brand/list`,
    method: "get",
    onStart: allBikesListDataRequested.type,
    onSuccess: listofBrandsDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const updateRentPoolid = (data: { [key: string]: object | string | number | null }) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentPool.name}/${apiPaths.rentPool.updateid}`,
    method: "post",
    data,
    onStart: allBikesListDataRequested.type,
    onSuccess: updateRentPoolidDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const unblockrentpoll = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.rentBooking.name}/unblock/${id}`,
    method: "get",
    onStart: allBikesListDataRequested.type,
    onSuccess: unblockRentPooliddataDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const getsingleRentbikes = (id: string) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.allBikesList.name}/${id}`,
    method: "get",
    onStart: allBikesListDataRequested.type,
    onSuccess: rentBikeDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });
export const updatePriceofrentbikes = (data: { [key: string]: number | string | boolean }) =>
  apiCallBegan({
    url: `/${apiPaths.version.v1}/${apiPaths.allBikesList.name}/${apiPaths.allBikesList.update}/${apiPaths.allBikesList.price}`,
    method: "post",
    data,
    onStart: allBikesListDataRequested.type,
    onSuccess: updatePricerentbikesDataRecieved.type,
    onError: allBikesListDataRequestFailed.type,
  });

