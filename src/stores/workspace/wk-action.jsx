import {wksActions} from './wk-slice'

export async function getLocationHandler() {
  const response = await fetchRequest(`/api/location`,`GET`)
  return response;
}

export const  storeLocation=(data)=>{
  return async (dispatch)=>{
      dispatch(wksActions.addLocation({
        location: data?.data || []
    }))
  }
}