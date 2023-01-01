import React, { useRef, useState, useEffect, useContext } from 'react'


import { useStateContext } from '../../contexts/ContextProvider';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GppBadIcon from '@mui/icons-material/GppBad';


const LOGIN_URL = '/login-user'

async function handleSubmit(e, form) {
  // Start by preventing the submission from reloading the page.
  e.preventDefault();
  // Get the data from the form.
  const userInfo = new FormData(document.getElementById("form"));

  // Get user input from the form.
  const data = {
    email: userInfo.get('email'),
    password: userInfo.get('password'),
  }

  if (data.email == '') {
    document.getElementById("email").setAttribute("error", "")
  }
  if (data.password == '') {
    document.getElementById("password").setAttribute("error", "")
  }

  // console.log("Email: " + data.email);
  // console.log("Password: " + data.password);

  const email = data.email;
  const password = data.password;

  let interval;

  function fadeOut(element, duration) {
    element.classList.add("error-message");

    let opacity = 1;

    interval = setInterval(function () {
      opacity -= 0.01;
      element.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(interval);
        element.remove();
      }
    }, duration / 1000);
  }

  fetch(`https://relayai.onrender.com${LOGIN_URL}`, {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      email,
      password,
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userSignup");
      console.log(JSON.stringify({
        email,
        password,
      }))
      if (data.status == "ok") {
        // alert("login success");
        window.localStorage.setItem('token', data.data);
        window.localStorage.setItem('loggedIn', true);
        const errorMessage = document.getElementById("error-message");
        const copy = errorMessage.cloneNode(true);
        copy.id = "new-id";
        errorMessage.parentNode.appendChild(copy);
        
        copy.setAttribute("class", "h-[6rem] p-8 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-xl w-full lg:w-full  m-3 bg-no-repeat bg-cover bg-center text-white text-center font-bold truncate")
        copy.textContent = "Login Success";
        clearInterval(interval);
        copy.style.opacity = 1;
        setTimeout(function () {
          fadeOut(copy, 5000);
        }, 1000);
        window.location.href = "./profile";

      } else {
        const errorMessage = document.getElementById("error-message");
        const copy = errorMessage.cloneNode(true);
        copy.id = "new-id";
        errorMessage.parentNode.appendChild(copy);
        
        copy.setAttribute("class", "h-[6rem] p-8 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-xl w-full lg:w-full  m-3 bg-no-repeat bg-cover bg-center text-white text-center font-bold truncate")
        copy.textContent = "Check email and password";
        clearInterval(interval);
        copy.style.opacity = 1;
        setTimeout(function () {
          fadeOut(copy, 5000);
        }, 1000);
      }
    })

}

const DescriptionDiv = () => {
  const { currentColor } = useStateContext();
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-30 rounded-xl w-full lg:w-full p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center">
      <div className="flex justify-between items-center ">
        <div className="w-full">
          <p className="font-bold text-gray-700 dark:text-gray-200 text-center mb-2">Sign In</p>
          <p
            className="text-s text-center"
            style={{ color: currentColor }}
          >
            Sign In to get started.
          </p>
        </div>
      </div>
    </div>
  )
}

const FormDiv = () => {
  const { currentColor } = useStateContext();
  const labelStyles = "block text-gray-700 text-sm font-bold  bg-white dark:text-gray-200 dark:bg-secondary-dark-bg capitalize"
  const detailStyles = "text-xs italic font-bold"
  const textInputStyles = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white dark:text-gray-200 dark:bg-main-dark-bg h-10 mb-2 mt-2"

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="w-full">
        <form
          className="max-w-full"
          id="form"
        >

          {/* Labels and tooltip for user text input area */}
          <div className="mt-4">
            <label
              className={labelStyles}
            >
              Email
            </label>
            <p
              style={{ color: currentColor }}
              class={detailStyles}
            >
            </p>
          </div>

          {/* User text input area */}
          <Input
            id="email"
            className={textInputStyles}
            type="email"
            name="email"
            placeholder="Email"
          />

          {/* Labels and tooltip for user text input area */}
          <div className="mt-4">
            <label
              className={labelStyles}
            >
              Password
            </label>
            <p
              style={{ color: currentColor }}
              class={detailStyles}
            >
            </p>
          </div>

          {/* User text input area */}
          <Input
            id="password"
            name="password"
            className={textInputStyles}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{ color: currentColor }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />


        </form>
      </div>
    </div>
  )
}

const FormSubmit = (props) => {
  const { currentColor } = useStateContext();
  const form = document.getElementById(props.formId);

  return (
    <div className="text-center">
      <button
        id="submit-button"
        color="white"
        style={{ backgroundColor: currentColor }}
        type="submit"
        className="text-m opacity-0.9 text-white hover:drop-shadow-xl rounded-xl p-4 mt-8"
        onClick={(e) => handleSubmit(e, form)}>
        Sign In
      </button>
    </div>
  )

}

const ToSignUp = () => {
  const { currentColor } = useStateContext();
  const textLinkStyles = "cursor-pointer"

  const register = () => {
    window.location.href = "./register";
  }

  return (
    <><div className="text-center mt-4">
      <p>Don't have an account?
        <a
          onClick={register}
          className={textLinkStyles}
          style={{ color: currentColor }}
        >
          &nbsp;&nbsp;Sign Up
        </a>
      </p>
    </div></>
  )
}

const ErrorMessageDiv = () => {
  const { currentColor } = useStateContext();
  return (
    <div
      id="error-message"
      name="error-message"
      style={{ backgroundColor: currentColor }}
      className=""
    />

  )
}

// Class-Based component
class UserSignIn extends React.Component {
  render() {
    return (
      <div className="mt-10">
        <div className="flex flex-wrap lg:flex-wrap max-w-xl m-auto">
          <DescriptionDiv />
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-30 rounded-xl w-full lg:w-full p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center">
            <FormDiv />
            <FormSubmit
              formId="form"
            />
            {/* <ToSignUp /> */}

            {/* <section>
              <p ref={errRef} className={errMsg ? "errmsg" :
                "offscreen"} aria-live="assertive "> {errMsg}</p>
            </section> */}
          </div>
          <ErrorMessageDiv />
        </div>
      </div>
    );
  }

}

export default UserSignIn;