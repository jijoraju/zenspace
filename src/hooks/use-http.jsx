import { useReducer, useCallback } from "react";
import { showToast, closeToast, toastPromise } from "@components/Toast";
import CircularProgress from '@mui/material/CircularProgress';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

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
      showToast("Loading...",'info',30000,{
        icon: <div className="toast-Icon-Wrap"> <CircularProgress color="inherit" size={20} /> </div>});

      try {
        const responseData = await requestFunction(requestData);
        responseData.isSuccess = true
        dispatch({
           type: "SUCCESS", 
           responseData,
        });

        closeToast();
      } catch (error) {
        error.isSuccess = false
        // console.log("error_http", error);
        dispatch({
          type: "ERROR",
          errorMessage:error, 
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
