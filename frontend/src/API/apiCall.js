import { apiCommanRequest } from "./apiCommanRequest";
const BASE_URL = "http://localhost:7980/api/v1";

export const login = async (body, header) => {
  return await apiCommanRequest("POST", `${BASE_URL}/login`, body, header);
};

export const getUserInfo = async (header, body) => {
  return await apiCommanRequest("GET", `${BASE_URL}/info`, body, header);
};

// export const singleUser = async (header, body) => {
//   return await apiCommanRequest(
//     "GET",
//     `${USER_BASE_URL}/userinfo`,
//     body,
//     header
//   );
// };
