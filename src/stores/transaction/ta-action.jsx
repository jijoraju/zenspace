import { taActions } from "./ta-slice";

// fetch getTransactions api
export async function getTransactions() {
  const response = await fetchRequest(`/api/booking-summery`, `GET`);
  return response;
}

// fetch get Transactions detail api
export async function getTransactionDetail(reference) {
  const response = await fetchRequest(`/api/booking-summary/${reference}`, `GET`);
  return response;
}

// ---------------------------
