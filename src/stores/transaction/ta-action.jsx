import { taActions } from "./ta-slice";

// fetch getTransactions api
export async function getTransactions() {
  const response = await fetchRequest(`/api/booking-summery`, `GET`);
  return response;
}

// ---------------------------

// store location to localStorage
export const storeLocation = (data) => {
  return async (dispatch) => {
    const locationList = data?.data;
    localStorage.setItem("locationList", JSON.stringify(locationList));

    dispatch(
      taActions.addLocation({
        location: locationList || [],
      })
    );
  };
};
