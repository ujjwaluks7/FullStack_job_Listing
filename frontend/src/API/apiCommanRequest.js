// import axios from "axios";
import { useContext } from "react";

export const apiCommanRequest = (method, url, body, header) => {
  console.log(body);
  const config = {
    method: method,
    body: JSON.stringify(body),
    headers: header ? header : { "Content-Type": "application/json" },
  };

  //   return axios(config)
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  return fetch(url, config)
    .then((data) => data.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};
