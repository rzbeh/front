import axios from "axios";

const API_BASE_URL = "http://localhost:5120";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});

const api = {
  checkSerial: async (serial, phoneNumber) => {
    return await axiosInstance.post("/api/Serial/check-serial", {
      serial,
      phoneNumber,
    });
  },

  getDetails: async (serial) => {
    return await axiosInstance.get(`/api/Serial/getUserInfo/${serial}`);
  },

  submitDetails: async (serial, km, sellernum, engineId) => {
    return await axiosInstance.post(`/api/Serial/submitUserInfo/${serial}`, {
      km,
      sellernum,
      engineId,
    });
  },

  calculateOperation: async (previousKm, currentKm) => {
    return await axiosInstance.post("/api/Serial/calculateOperation", {
      previousKm,
      currentKm,
    });
  },
};

export default api;
