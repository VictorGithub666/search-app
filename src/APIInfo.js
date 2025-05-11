import axios from "axios";

const API_KEY = "AIzaSyCBQB7fm-F6nGcoS1WIFgbiVc6Y6HqXW5I"; // Replace with your chosen API key
const BASE_URL = "https://www.googleapis.com/youtube/v3/";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    language: "en-US",
    include_adult: false,
  },
});

export default api;
