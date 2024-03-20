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

// labour profile
export const fetchLabourProfile = async (header, body) => {
  return await apiCommanRequest(
    "POST",
    `${BASE_URL}/labour/profile`,
    body,
    header
  );
};

// create post
const data = {
  name: "rajeev",
  age: 20,
};
export const createPost = async (header, data) => {
  return await apiCommanRequest(
    "POST",
    `${BASE_URL}/contractor/createpost`,
    data,
    header
  );
};

export const contractorAllPosts = async (header, body) => {
  return await apiCommanRequest(
    "GET",
    `${BASE_URL}/contractor/allposts`,
    body,
    header
  );
};

export const deleteSinglePost = async (header, id, body) => {
  return await apiCommanRequest(
    "DELETE",
    `${BASE_URL}/contractor/delete/${id}`,
    body,
    header
  );
};

export const viewSinglePost = async (header, id, body) => {
  return await apiCommanRequest(
    "GET",
    `${BASE_URL}/contractor/view/${id}`,
    body,
    header
  );
};

// edit single post
export const editSinglePost = async (header, id, body) => {
  return await apiCommanRequest(
    "PUT",
    `${BASE_URL}/contractor/edit/${id}`,
    body,
    header
  );
};

export const contractorProfile = async (header, body) => {
  return await apiCommanRequest(
    "GET",
    `${BASE_URL}/contractor/profile`,
    body,
    header
  );
};

export const updateLabourProfile = async (header, body) => {
  return await apiCommanRequest(
    "PUT",
    `${BASE_URL}/labour/updateprofile`,
    body,
    header
  );
};

export const updateContractorProfile = async (header, body) => {
  return await apiCommanRequest(
    "PUT",
    `${BASE_URL}/contractor/updateprofile`,
    body,
    header
  );
};

export const allPosts = async (header, body) => {
  return await apiCommanRequest("GET", `${BASE_URL}/dalywork`, body, header);
};

export const postApply = async (header, body) => {
  return await apiCommanRequest("POST", `${BASE_URL}/postapply`, body, header);
};
