import { combineReducers } from "redux";
import cancelledBookingReducer from "./cancelledBooking";
import createBookingReducer from "./createBooking";
import ongoingBookingReducer from "./ongoingBooking";
import rentPoolReducer from "./rentPool";
import searchBikesReducer from "./searchBikes";
import reportsReducer from "./reports"
import nobookingReducer from "./nobooking"
import pickUpReducer from "./pickUpStore"

export default combineReducers({
  ongoingBooking: ongoingBookingReducer,
  cancelledBooking: cancelledBookingReducer,
  rentPool: rentPoolReducer,
  createBooking: createBookingReducer,
  searchBikes: searchBikesReducer,
  reports: reportsReducer,
  nobooking: nobookingReducer,
  pickupStore: pickUpReducer,
});
