import {wksActions} from './wk-slice'
// fetch location api
export async function getLocationHandler() {
  const response = await fetchRequest(`/api/location`,`GET`)
  return response;
}




export const getLocationFromStorage = ()=>{
  const locationList = JSON.parse(localStorage.getItem('locationList'));

  if(!locationList)return null

  return locationList
}

export const  storeLocation=(data)=>{
  return async (dispatch)=>{
    const locationList = data?.data
    localStorage.setItem('locationList', JSON.stringify(locationList));

      dispatch(wksActions.addLocation({
        location: locationList || []
    }))
  }
}