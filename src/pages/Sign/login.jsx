import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Input from "@components/Input";
import Button from "@components/Button";
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";

// validation
import {emailReg,passwordReg} from '$LIB/validation';

// reducer
import { postSignInHandler, LoginHandler } from "@Reducer/user/user-action";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const user = useSelector((state) => state.user);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => emailReg.test(value));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => passwordReg.test(value));

  const {
    sendRequest,
    status,
    data: signInRequestData,
  } = useHttp(postSignInHandler);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const checkUserStatus = () => {
      if (user.isLogin) {
        navigate("/", { replace: true });
      }
    };
    checkUserStatus();
  }, [user.isLogin]);

  // check out sign in status
  useEffect(() => {
    if (signInRequestData?.isSuccess) {
      dispatch(LoginHandler(signInRequestData));
    }
  }, [signInRequestData]);

  // check form isValid
  useEffect(() => {
    const identifier = setTimeout(() => {
      // console.log("Checking form validity!");
      setFormIsValid(enteredEmailIsValid && enteredPasswordIsValid);
    }, 500);

    return () => {
      // console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [enteredEmailIsValid, enteredPasswordIsValid]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      const data = {
        email: enteredEmail,
        password: enteredPassword,
      };

      signInHandler(data);
    } else if (!enteredEmailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  const signInHandler = useCallback(
    (data) => {
      sendRequest(data);
    },
    [sendRequest]
  );

  const inputs = [
    {
      ref: emailInputRef,
      id: `email`,
      label: `E-Mail`,
      type: `email`,
      isValid: enteredEmailIsValid,
      value: enteredEmail,
      onChange: emailChangeHandler,
      onBlur: emailBlurHandler,
      hasError: emailInputHasError,
    },
    {
      ref: passwordInputRef,
      id: `password`,
      label: `Password`,
      type: `password`,
      isValid: enteredPasswordIsValid,
      value: enteredPassword,
      onChange: passwordChangeHandler,
      onBlur: passwordBlurHandler,
      hasError: passwordInputHasError,
    },
  ];
  
  return (
    <>
      <h1>Log in</h1>

      <form onSubmit={submitHandler} className="sign-container-area-form">
        {inputs.map((item, index) => (
          <Input
            key={index} {...item}
            className={`sign-container-area-form-inputBox`}
          />
        ))}

        <Button
          disabled={!formIsValid || status == "pending"}
          className={`sign-container-area-submitBtn`}
        >
          {status == "pending" ? `Loading...` : `Log in`}
        </Button>

        <p className="sign-container-area-hint">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </>
  );
}

export default Login;
