import { useState, useRef } from "react";
import Axios from "axios";
import { Card, CardContent, TextField, Button } from "@mui/material";
import classes from "./ForgetPassword.module.css";
import EmailSent from "./EmailSent";
const ResetPasswordLink = () => {
  const emailInputRef = useRef();
  const [emailSentState, setEmailSentState] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    async function resetPasswordLink() {
      const res = await Axios.post("http://localhost:3001/forgetPassword", {
        email: enteredEmail,
      });
      console.log(res.data.result);
      return res;
    }

    resetPasswordLink()
      .then((res) => {
        console.log(res.data == "user not found");
        if (res.data != "user not found") {
          console.log("Email Sended");
          setEmailSentState(true);
        } else {
          let errorMessage = "User is not registered";
          throw new Error(errorMessage);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.container}>
      {emailSentState && <EmailSent />}
      {!emailSentState && (
        <Card className={classes.card}>
          <CardContent>
            <h1>忘記密碼</h1>
            <h2>請輸入你登記的電郵地址</h2>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                label="電郵"
                variant="outlined"
                fullWidth
                // value={email}
                className={classes.email}
                ref={emailInputRef}
              />
              <button className={classes.button}>發送重置鏈接</button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResetPasswordLink;
