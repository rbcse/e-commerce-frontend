const ENV = {
  HOST: import.meta.env.VITE_API_HOST || "http://localhost:8080",
  API_VERSION: import.meta.env.VITE_API_VERSION || "api/v1",
};

export const BASE_URL = `${ENV.HOST}/${ENV.API_VERSION}`;

export default ENV;