import { toastPromise, closeToast } from "@components/Toast";
const domain = API_DOMAIN;
const second = 30000;
// const domain = 'http://localhost:5173'
// const domain = 'http://127.0.0.1:5173'

window.fetchRequest = fetchRequestHandler;

export default function fetchRequestHandler(url, method, param) {
  let header;
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (user) {
    header = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${user.token}`,
    };
  } else {
    header = {
      "Content-Type": "application/json; charset=utf-8",
    };
  }

  const fetchParams = {
    method: method,
    headers: header,
  };

  if (param) {
    fetchParams.body = JSON.stringify(param);
  }
  const requestData = fetchHandler(url, fetchParams);
  return requestData;
}

export async function fetchHandler(url, fetchParams) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await timeout_fetch(
        fetch(domain + url, fetchParams),
        second
      );
      console.log("response", response);
      const respondData = await response.json();
      console.log("respondData", respondData);

      if (!response?.ok && respondData) {
        const error = errorHandler(response?.status, respondData);
        reject(error);
        return;
      }

      resolve(respondData);
    } catch (err) {
      const error = errorHandler(500, err);
      reject(error);
    }
  });
}

const errorHandler = (status, err) => {
  console.log("request err", err);
  const error = {
    status: status || 500,
    errorCode: "RESOURCE_NOT_FOUND",
    message: err?.message || "Something went wrong!",
  };

  closeToast();
  toastPromise(Promise.reject(error), {
    error: `${error?.message} 🤯`,
    autoClose: 1000,
  });
  return error;
};

function timeout_fetch(fetch_promise, timeout = second) {
  let timeout_fn = null;

  let timeout_promise = new Promise(function (resolve, reject) {
    timeout_fn = function () {
      reject("over time!!!");
    };
  });

  let abortable_promise = Promise.race([fetch_promise, timeout_promise]);

  setTimeout(function () {
    timeout_fn();
  }, timeout);

  return abortable_promise;
}
