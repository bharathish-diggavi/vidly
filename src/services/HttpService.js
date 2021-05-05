import axios from "axios";
import { toast } from "react-toastify";
import logger from "./LoggingService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("interceptor called", error);
    toast.error("something went wrong");
    logger.logError(error);
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

function setJwtToken(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwtToken,
};
