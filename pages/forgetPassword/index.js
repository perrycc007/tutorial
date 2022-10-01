import { useState, useRef } from 'react';
import Axios from "axios";

const ResetPasswordLink = () => {

  const emailInputRef = useRef()


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    async function resetPasswordLink(){
      const res = await Axios.post('http://localhost:3001/forgetPassword', 
      {email: enteredEmail}
      )
    console.log(res.data.result);
    return (res)};
  
    resetPasswordLink().then((res) => {
      console.log(res.data == 'user not found')
        if (res.data != 'user not found') {
          console.log('Email Sended')
        } else {
            let errorMessage = 'User is not registered';
            throw new Error(errorMessage);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div>
            <button>Send Reset Link</button>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordLink;
