import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image:{
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

 const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
       const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        console.log('response Data??', responseData);
        auth.login(responseData.userId, responseData.role, responseData.token );
      } catch (err) {}
    } else {
      try {
       const formData = new FormData();
       formData.append('name', formState.inputs.name.value);
       formData.append('password', formState.inputs.password.value);
       formData.append('image', formState.inputs.image.value);
       const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          'POST',
          formData
        );
        auth.login(responseData.userId, responseData.role,  responseData.token);
      } catch (err) {
        return err;
      }
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr className="mts-hr" />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image"/>}
          <Input
              element="input"
              id="name"
              type="text"
              label="Username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a username."
              onInput={inputHandler}
            />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <hr className="mts-hr"/>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
