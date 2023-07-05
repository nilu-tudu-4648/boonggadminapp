
export const apiPaths = {
  version: { v1: "api" },
  storeforid: 'storeforid',
  rentBooking: {
    name: "rentbooking",
    ongoingBooking: { list: "list", ongoing: "ONGOING" },
    cancelledBooking: { list: "list", cancelled: "CANCELLED" },
  },
  rentPool: {
    name: "rent-pool",
    allListStore: "all-list-store",
    delete: "rent-pool-delete",
    updateid: "update-id"
  },
  allBikesList: {
    name: "rentbikes",
    list: "list",
    update: "update",
    price: "price"
  },
  search: {
    rent: "rent",
    name: "search",
    city: "Pune",
    startDate: "start_date",
    endDate: "end_date",
  },
  reports: {
    rentpool: "rent-pool",
    alllist: "all-list",
    rentbooking: "rentbooking",
    allbookingbydate: "all-booking-by-date",
    stores: "stores",
    brand: "brand",
    list: "list",
  },
  nobooking: {
    rentbooking: "rentbooking",
    nobooking: "nobooking",
    list: "list",
    NOBOOKING: "NOBOOKING",
  },
  prod: {
    // url: 'https://b894-2405-201-a410-ca50-4c28-ab70-4951-c5ae.ngrok-free.app' //ngrok
    url: 'http://dev-api.boongg.com:3100' //dev
    // url: 'https://api.boongg.com'  // prod
    // url: 'http://192.168.29.36:3100'  // i
  }
};
