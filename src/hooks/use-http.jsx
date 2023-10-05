import { useReducer, useCallback } from "react";
import { showToast, closeToast } from "@components/Toast";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: "SEND" });
      showToast("Loading...", "warning");

      try {
        const responseData = await requestFunction(requestData);
        responseData.isSuccess = true
        dispatch({
           type: "SUCCESS", 
           responseData,
        });

        closeToast();
        // showToast("Successful", "success");
      } catch (error) {
        error.isSuccess = false
        // console.log("error_http", error);
        closeToast();
        showToast(error.message, "error");
        dispatch({
          type: "ERROR",
          errorMessage:error, 
          // errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
