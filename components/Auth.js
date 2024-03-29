import { useState, useRef } from "react";
import { useRouter } from "next/router";
// import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import useStore from "../stores/stores";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import AuthContext from '../../store/auth-context';
// import classes from './AuthForm.module.css';

const AuthForm = () => {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const addUserid = useStore((state) => state.addUserid);
  const loginAction = useStore((state) => state.loginUserid);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    console.log(enteredEmail);
    setIsLoading(true);
    let url;
    if (isLogin) {
      url = "http://localhost:3001/login";
    } else {
      url = "http://localhost:3001/register";
    }
    async function logIn() {
      const res = await Axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log(res.data.result);
      return res;
    }

    logIn()
      .then((res) => {
        setIsLoading(false);
        if (res.status == 200) {
          return res.data;
        } else {
          return res.then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {
        // const expirationTime = new Date(
        //   new Date().getTime() +　1000000
        //   //  + +res.expiresIn * 1000
        // );
        console.log(res.userID);
        addUserid(res.userID);
        loginAction();
        // authCtx.login(
        //   res.accessToken,
        //   expirationTime.toISOString(),
        //   res.userID
        //   );
        console.log(res.accessToken);
        router.push("/cases");
      })
      .catch((err) => {
        alert(err.message);
        setIsLoading(false);
      });
  };

  return (
    <section>
      <h1>{isLogin ? "登入" : "登記"}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <TextField
            label="Email"
            type="email"
            id="email"
            required
            inputRef={emailInputRef}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            id="password"
            required
            inputRef={passwordInputRef}
          />
        </div>
        <div>
          {!isLoading && (
            <Button variant="outlined" onClick={submitHandler}>
              {isLogin ? "Login" : "Create Account"}
            </Button>
          )}
          {isLoading && <p>Sending request...</p>}
          <Button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
          <Button>
            <Link href="/forgetPassword">Forget Password</Link>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
