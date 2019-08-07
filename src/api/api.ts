import axios, { AxiosResponse } from "axios";

import { getAccessToken, saveTokenToLocalStorage } from "../util/localStorage";

let accessToken: any = null;

function getAccessTokenFromStorage() {
  if (accessToken == null) {
    accessToken = getAccessToken();
    return accessToken;
  }
  return accessToken;
}

export const fetchData = async (url: string, method: string, auth: string) => {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: "Basic " + auth,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(res => res.json());
  console.log(response);
  saveTokenToLocalStorage(response);
  return response;
};

export const getDataFromFitbit = async (url: string, authCode?: string) => {
  const method = "GET";
  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authCode
    }
  });
  return res.json().then(res => res);
};

export async function postApiCallWithConfig(url: string, data: any) {
  const token = getAccessTokenFromStorage();
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  };
  return axios
    .post(url, data, config)
    .then(response => handleResponseStatus(response));
}

export const deleteData = async (url: string) => {
  const token = getAccessTokenFromStorage();
  const method = "DELETE";
  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token
    }
  });
  return res.json().then(res => res);
};

const handleResponseStatus = async (response: AxiosResponse) => {
  if ((response && response.status < 200) || response.status >= 300) {
    const error: any = new Error(response.statusText);
    error.response = await response;

    if (response.status === 401) {
    }
    throw error;
  }

  return response;
};
