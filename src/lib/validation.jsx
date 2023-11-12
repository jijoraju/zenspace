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