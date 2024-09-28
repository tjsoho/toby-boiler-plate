import axios from "axios";
import config from "@/appConfig";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

// API client for Frontend requests
const apiClient = axios.create({
  baseURL: "/api",
});

const onSuccess = (response: any) => response.data;
const onError = (error: any) => {
  const { response = {} } = error;

  if (response.status === 401) {
    return signIn(undefined, { callbackUrl: config.auth.callbackUrl });
  }

  let message = response.data?.error || error.message || error.toString();
  message = typeof message === "string" ? message : JSON.stringify(message);

  toast.error(message || "Something went wrong...");
  return Promise.reject(error);
};

apiClient.interceptors.response.use(onSuccess, onError);

export default apiClient;
