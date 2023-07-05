import { apiCallBegan, apiCallFailed, apiCallSuccess } from "@/store/api";
import axios from "axios";
import { Middleware } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiPaths } from "@/api/apiPaths";
const api: Middleware =
  ({ dispatch, getState }) =>
    (next) =>
      async (action) => {
        if (action.type !== apiCallBegan.type) {
          return next(action);
        }
        const { url, method, data, onSuccess, onStart, onError, headers } = action.payload;

        if (onStart) {
          dispatch({ type: onStart });
        }

        next(action);

        try {
          const userExist = await AsyncStorage.getItem('@userExist')
          const response = await axios.request({
            baseURL: apiPaths.prod.url, //dev
            url,
            method,
            data,
            //FIXME: Don't keep header hardcoded here
            headers: {
              ...headers,
              Authorization: userExist !== null && JSON.parse(userExist)
            }
            // withCredentials: true,
          });
          // console.log("response", response);

          // general success action
          dispatch(apiCallSuccess(response.data));

          //specific
          if (onSuccess) {
            dispatch({ type: onSuccess, payload: response.data });
          }
        } catch (err: any) {
          //General error action
          dispatch(apiCallFailed(err.response?.data || err.message));

          //specific
          if (onError) {
            dispatch({ type: onError, payload: err.response?.data || err.message });
          }
        }
      };

export default api;
