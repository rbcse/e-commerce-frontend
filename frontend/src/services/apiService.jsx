import axios from "axios";
import { BASE_URL } from "../config/env-config";

const ApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach auth token if available
ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — unwrap data or handle errors globally
ApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    console.error("[Api Error]", message);
    return Promise.reject(new Error(message));
  }
);

/**
 * GET request
 * @param {string} endpoint - e.g. "/countries"
 * @param {object} params   - optional query params
 */
export const get = (endpoint, params = {}) => {
  return ApiClient.get(endpoint, { params });
};

/**
 * POST request
 * @param {string} endpoint - e.g. "/signup"
 * @param {object} body     - request payload
 */
export const post = (endpoint, body = {}) => {
  return ApiClient.post(endpoint, body);
};

/**
 * PUT request
 * @param {string} endpoint - e.g. "/user/1"
 * @param {object} body     - request payload
 */
export const put = (endpoint, body = {}) => {
  return ApiClient.put(endpoint, body);
};

/**
 * DELETE request
 * @param {string} endpoint - e.g. "/user/1"
 */
export const del = (endpoint) => {
  return ApiClient.delete(endpoint);
};

export default ApiClient;