import axios from "axios";

const api = axios.create({
  baseURL: "https://brapi.dev/api",
  headers: {
    Authorization: "Bearer kxtixqqYEKDAqJV9Wf5fCe"
  }
});

export { api };