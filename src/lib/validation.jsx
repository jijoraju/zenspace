export const emailReg =
  /^[A-Za-z0-9_\.]+(?:\.[a-zA-Z0-9_\.\-]){0,}@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// user
export const nameReg = /^[a-zA-Z]{3,14}$/;
export const passwordReg = /^[a-zA-Z0-9]{6,14}$/;

// payment
export const paymentName = /^[a-zA-Z\s\-]{6,14}$/;
export const paymentExpiration = /^\d{1,2}$/
export const paymentCardNum = /^[\d\s]{19}$/;
export const paymentCvv = /^\d{3}$/
export const paymentPostCode = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;



export const getMoneyFormat = (number) => {
  // 轉千分位
  let newNumber = number + "";
  if (newNumber.includes(".")) {
    // 判斷有無浮點數
    return newNumber.replace(/(\d{1,3})(?=(\d{3})+\.)/g, "$1,");
  } else {
    return newNumber.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  }
};