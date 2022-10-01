import {  useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
// import { useNavigate } from 'react-router-dom';
import Axios from "axios";
// import useStore from '../stores/stores';

const ResetPassword = () => {
  const router = useRouter();
  const passwordInputRef = useRef();
  const ConfirmPasswordInputRef = useRef();
  const { token } = router.query
  const { userid } = router.query
  // const addUserid = useStore(state => state.addUserid);
  // const loginAction = useStore(state => state.loginUserid);
  useEffect(()=>{
    console.log(userid,token)
    async function Verify(userid, token){    
        const res = await Axios.get(`http://localhost:3001/forgetPassword/${userid}/${token}`)
        console.log(res.data)
        return res}
    if (token != null){
      Verify(userid, token).then((res) => {
        console.log(res)
          if (res.data == 'jwt expired') {
            let errorMessage = 'Link has Expired';
            throw new Error(errorMessage);
          } else if (res.data =='invalid token'){
            let errorMessage = 'Link is invalid';
            throw new Error(errorMessage);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } 
},[router.query])



  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = ConfirmPasswordInputRef.current.value;


    async function ResetPassword(){
      const res = await Axios.post(`http://localhost:3001/forgetPassword/${userid}/${token}`, 
      {
      password: enteredPassword}
      )
    console.log(res.data);
    return (res)};
    if (passwordInputRef == enteredConfirmPassword){
    ResetPassword().then((res) => {
        if (res.status == 200) {
          return res.data;
        } else {
          return res.then((data) => {
            let errorMessage = 'Reset failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {

        // console.log(res.userID)
        //   addUserid(res.userID)
        //   loginAction()
        router.push('/')
      })
      .catch((err) => {
        alert(err.message);
      })
    }else{
      alert('Passwords do not match');
    }
  };

  return (
    <section>
      <form onSubmit={submitHandler}>

        <div>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            id='ConfirmPassword'
            required
            ref={ConfirmPasswordInputRef}
          />
        </div>
        <div>
            <button>Reset</button>    
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
