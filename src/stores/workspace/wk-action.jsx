import { wksActions } from "./wk-slice";
// fetch location api
export async function getLocationHandler() {
  const response = await fetchRequest(`/api/location`, `GET`);
  return response;
}

// fetch work space api
export async function getWorkSpaceHandler(param) {
  /**
   * workspace_type == 'ONE_DAY' or 'MULTIPLE_DAYS'
   * price = Maximum price per day.
   * rating = Minimum average rating.
   * noOfSpace = Total space required.
   */

  const { location, dateSelected, headcounts, pageIndex, sequenceType } = param;

  const { location_id } = location;
  const { start, end, workspace_type, } = dateSelected;

  const endDate = workspace_type == `ONE_DAY` ? start : end;
  const response = await fetchRequest(
    `/api/workspace/search?locationId=${location_id}&workspace_type=${workspace_type}&noOfSpace=${headcounts}&startDate=${start}&endDate=${endDate}&page=${pageIndex}&pageSize=${6}&sort=name&order=${sequenceType}`,
    `GET`
  );

  return response;
}

// fetch product Detail api
export async function fetchProductDetailHandler(id) {
  const response = await fetchRequest(`/api/workspace/${id}`, `GET`);
  return response;
}


// ---------------------------


// get location from localStorage
export const getLocationFromStorage = () => {
  const locationList = JSON.parse(localStorage.getItem("locationList"));

  if (!locationList) return null;

  return locationList;
};

// store location to localStorage
export const storeLocation = (data) => {
  return async (dispatch) => {
    const locationList = data?.data;
    localStorage.setItem("locationList", JSON.stringify(locationList));

    dispatch(
      wksActions.addLocation({
        location: locationList || [],
      })
    );
  };
};
