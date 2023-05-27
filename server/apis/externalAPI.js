import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const externalAPI = axios.create({
  baseURL: "https://open-api.bser.io/v1",
});

externalAPI.interceptors.request.use(function (config) {
  config.headers["accept"] = "application/json";
  config.headers["x-api-key"] = process.env.Eternal_Return_API_KEY;

  return config;
});

export default externalAPI;
