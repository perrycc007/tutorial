import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { useNavigate } from 'react-router-dom';
import Axios from "axios";
// import useStore from '../stores/stores';
import ResetComplete from "./ResetComplete";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const router = useRouter();
  const passwordInputRef = useRef();
  const ConfirmPasswordInputRef = useRef();
  const { token } = router.query;
  const { userid } = router.query;
  const [resetComplete, setResetComplete] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = ConfirmPasswordInputRef.current.value;

    async function ResetPassword() {
      const res = await Axios.post(
        `http://localhost:3001/forgetPassword/${userid}/${token}`,
        {
          password: enteredPassword,
        }
      );
      console.log(res.data);
      return res;
    }
    if (passwordInputRef == enteredConfirmPassword) {
      ResetPassword()
        .then((res) => {
          if (res.status == 200) {
            setResetComplete(true);
            return res.data;
          } else {
            return res.then((data) => {
              let errorMessage = "Reset failed!";
              throw new Error(errorMessage);
            });
          }
        })
        .then((res) => {
        //   router.push("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Passwords do not match");
    }
  };

  if (resetComplete) {
    return <ResetPasswordComplete />;
  }


  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            重置你的密碼
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              required
              fullWidth
              margin="normal"
              label="新密碼"
              type="password"
              // value={newPassword}
              ref={passwordInputRef}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              label="確認新密碼"
              type="password"
              // value={confirmNewPassword}
              ref={ConfirmPasswordInputRef}
            />
            <div className={classes.buttonContainer}>
              <button className={classes.button} type="submit">
                重設密碼
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResetPassword;
