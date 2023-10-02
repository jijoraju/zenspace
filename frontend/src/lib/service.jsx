window.domain = 'https://zenspace-backend.onrender.com/'

window.fetchRequest = fetchRequestHandler

export default function fetchRequestHandler (url, method, param){
  let header;

  if (user.UserLogin == true) {
    header = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: user.Token,
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
  fetchHandler(url, fetchParams);
}

export async function fetchHandler(url, fetchParams) {
  const response = await fetch(domain + url, fetchParams);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  return data;
}
