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
      const response = await fetch(domain + url, fetchParams);
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