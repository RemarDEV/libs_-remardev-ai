import axios from "axios";

export const APIBaseURL =
  (process.env.NODE_ENV == "development" && process.env.DEV == "true")
    ? "http://localhost:3000/public"
    : "https://apis.remardev.com/eu/ai0/public";

const API = {
  token: "",
  request: axios.create(),

  setToken(token: string) {
    this.token = token;

    this.request = axios.create({
      baseURL: APIBaseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default API;
