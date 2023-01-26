import Axios from "axios";
import ProfileForm from "../../../components/Form/ProfileForm";
import { useEffect, useState } from "react";
import LoadingScreen from "../../../components/Layout/LoadingScreen";
const UserProfile = (props) => {
  const [loading, setLoading] = useState(true);
  console.log(props.reponse);

  useEffect(() => {
    if (props.status == 200) {
      setLoading(false);
    }
  }),
    [props.reponse];
  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && <ProfileForm profile={props.reponse} tutor={props.tutor} />}
    </>
  );
};
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  // fetch data from an API
  const response = await Axios.get(
    `http://localhost:3001/profile/${params.userid}`
  );
  const tutor = await Axios.get(`http://localhost:3001/tutor/${params.userid}`);

  return {
    props: {
      reponse: response.data.result,
      tutor: tutor.data.result,
      status: response.status,
    },
    revalidate: 1,
  };
}

export default UserProfile;
