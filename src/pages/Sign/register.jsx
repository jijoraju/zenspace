import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Input from "@components/Input";
import Button from "@components/Button";
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";

import {
  postSignUpHandler,
  postSignInHandler,
  LoginHandler,
} from "@Reducer/user/user-action";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: FirstNameChangeHandler,
    inputBlurHandler: FirstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: LastNameChangeHandler,
    inputBlurHandler: LastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    sendRequest,
    status,
    data: signUpRequestData,
  } = useHttp(postSignUpHandler); // sign up
  const {
    sendRequest: loginRequest,
    status: loginStatus,
    data: signInRequestData,
  } = useHttp(postSignInHandler); // sign in

  const [formIsValid, setFormIsValid] = useState(false);

  // direct to home page after login
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
  // check out sign up status
  useEffect(() => {
    if (signUpRequestData?.isSuccess) {
      const data = {
        email: enteredEmail,
        password: enteredPassword,
      };
      loginRequest(data);
    }
  }, [signUpRequestData]);

  // check form isValid
  useEffect(() => {
    const identifier = setTimeout(() => {
      const isValid =
        enteredFirstNameIsValid &&
        enteredLastNameIsValid &&
        enteredEmailIsValid &&
        enteredPasswordIsValid;
      setFormIsValid(isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    enteredFirstNameIsValid,
    enteredLastNameIsValid,
    enteredEmailIsValid,
    enteredPasswordIsValid,
  ]);

  // submit
  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      const data = {
        firstname: enteredFirstName,
        lastname: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
      };
      signUpHandler(data);
    } else if (!enteredFirstNameIsValid) {
      firstNameInputRef.current.focus();
    } else if (!enteredLastNameIsValid) {
      lastNameInputRef.current.focus();
    } else if (!enteredEmailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  const signUpHandler = useCallback(
    (data) => {
      sendRequest(data);
    },
    [sendRequest]
  );

  const inputs = [
    {
      ref: firstNameInputRef,
      id: `firstName`,
      label: `First Name`,
      type: `text`,
      isValid: enteredFirstNameIsValid,
      value: enteredFirstName,
      onChange: FirstNameChangeHandler,
      onBlur: FirstNameBlurHandler,
      hasError: firstNameInputHasError,
    },
    {
      ref: lastNameInputRef,
      id: `lastName`,
      label: `Last Name`,
      type: `text`,
      isValid: enteredLastNameIsValid,
      value: enteredLastName,
      onChange: LastNameChangeHandler,
      onBlur: LastNameBlurHandler,
      hasError: lastNameInputHasError,
    },
    {
      ref: emailInputRef,
      id: `email`,
      label: `E-mail`,
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
      <h1>Sign up</h1>

      <form onSubmit={submitHandler} className="sign-container-area-form">
        {inputs.map((item, index) => (
          <Input
            key={index}
            {...item}
            styleName={`sign-container-area-form-inputBox`}
          />
        ))}

        <Button
          disabled={!formIsValid || status == "pending"}
          styleName={`sign-container-area-submitBtn`}
        >
          {status == "pending" ? `Loading...` : `Sign up`}
        </Button>

        <p className="sign-container-area-hint">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </>
  );
}

export default Register;
