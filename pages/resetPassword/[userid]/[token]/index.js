import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
// import { useNavigate } from 'react-router-dom';
import Axios from "axios";
// import useStore from '../stores/stores';
import ResetPassword from "../../../../components/ResetPassword/ResetPassword";
import InvalidResetLink from "../../../../components/ResetPassword/InvalidResetLink";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const { userid } = router.query;
  const [linkValid, setLinkValid] = useState(false);
  useEffect(() => {
    console.log(userid, token);
    async function Verify(userid, token) {
      const res = await Axios.get(
        `http://localhost:3001/forgetPassword/${userid}/${token}`
      );
      console.log(res.data);
      return res;
    }
    if (token != null) {
      Verify(userid, token)
        .then((res) => {
          console.log(res);
          
          if (res.data == "jwt expired") {
            // let errorMessage = "Link has Expired";
            setLinkValid(false);
            // throw new Error(errorMessage);
          } else if (res.data == "invalid token") {
            // let errorMessage = "Link is invalid";
            setLinkValid(false);
            // throw new Error(errorMessage);
          } else {
            setLinkValid(true);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [router.query]);

  return (
    <Fragment>
      {linkValid && <ResetPassword />}
      {!linkValid && <InvalidResetLink />}
    </Fragment>
  );
};

export default ResetPasswordPage;
