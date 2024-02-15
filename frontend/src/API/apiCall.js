import { apiCommanRequest } from "./apiCommanRequest";
const BASE_URL = "http://localhost:7980/api/v1";

export const login = async (body, header) => {
  return await apiCommanRequest("POST", `${BASE_URL}/login`, body, header);
};

export const getUserInfo = async (header, body) => {
  return await apiCommanRequest("GET", `${BASE_URL}/info`, body, header);
};

// contractor registration
export const contractorRegistration = async (body, header) => {
  return await apiCommanRequest(
    "POST",
    `${BASE_URL}/contractor/register`,
    body,
    header
  );
};

// labour registration
export const labourRegistration = async (body, header) => {
  return await apiCommanRequest(
    "POST",
    `${BASE_URL}/labour/register`,
    body,
    header
  );
};
