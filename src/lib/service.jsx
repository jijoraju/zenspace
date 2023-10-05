const domain = API_DOMAIN
// const domain = 'http://localhost:5173'
// const domain = 'http://127.0.0.1:5173'

window.fetchRequest = fetchRequestHandler

export default function fetchRequestHandler (url, method, param){
  let header;
  const user = JSON.parse(localStorage.getItem('userInfo'))

  if (user) {
    header = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Bearer ${user.token}`,
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
  return requestData
}

export async function fetchHandler(url, fetchParams) {
  
  return new Promise(async(resolve,reject)=>{

    try{
      const response = await timeout_fetch(fetch(domain + url, fetchParams),5000);
      console.log('response',response)
      const respondData = await response.json();
      console.log('respondData',respondData)

      if (!response?.ok && respondData) {
        const error = errorHandler(response?.status,respondData)
        reject(error)
      }

      resolve(respondData)
    }catch(err){
      console.log('err',err)
        const error = errorHandler(500,err)
        reject(error)
    }

  })

}

const errorHandler = (status, err)=>{
  const error = {
    status: err?.status || 500,
    errorCode: 'RESOURCE_NOT_FOUND',
    message: err?.message || "Something went wrong!",
  };

  return error
}

function timeout_fetch(fetch_promise, timeout = 10000) {
    let timeout_fn = null;
    
    let timeout_promise = new Promise(function (resolve, reject) {
        timeout_fn = function () {
            reject('over time!!!');
        };
    });

    let abortable_promise = Promise.race([
        fetch_promise,
        timeout_promise
    ]);

    setTimeout(function () {
        timeout_fn();
    }, timeout);

    return abortable_promise;
}
