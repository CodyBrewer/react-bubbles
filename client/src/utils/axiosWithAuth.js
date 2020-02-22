import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-type": "application/json",
      Authorization: `${token}`
    }
  });
};
