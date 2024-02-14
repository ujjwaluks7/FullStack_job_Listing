// import axios from "axios";
import { useContext } from "react";

export const apiCommanRequest = (method, url, body, header) => {
  const config = {
    method: method,
    body: JSON.stringify(body),
    headers: header ? header : { "Content-Type": "application/json" },
  };

  return fetch(url, config)
    .then((data) => data.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};
