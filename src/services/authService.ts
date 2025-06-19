import axios from "axios";

export const register = (formData: FormData) => {
  return axios.post(
    "https://web-production-3ca4c.up.railway.app/api/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const login = (formData: FormData) => {
  return axios.post(
    "https://web-production-3ca4c.up.railway.app/api/login",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
