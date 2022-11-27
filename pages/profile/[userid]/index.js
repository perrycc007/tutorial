import * as React from 'react';
import Axios from 'axios';
import ProfileForm from '../../../components/Form/ProfileForm';
import userStore from '../../../stores/stores';
const UserProfile = (props) => {
  return (
    <>
      <ProfileForm  profile={props.profile} student={props.student} tutor={props.tutor}/>
    </>
  );
};
export async function getStaticPaths() {
    return { 
      paths: []
    , fallback: true }
  }
  
export async function getStaticProps(context) {
  const { params } = context;
  // fetch data from an API
  const response = await Axios.get(`http://localhost:3001/profile/${params.userid}`,)
  // const student = await Axios.get(`http://localhost:3001/student/${1}`,)
  const tutor = await Axios.get(`http://localhost:3001/tutor/${params.userid}`,)


  
  console.log(response.data.result)
  console.log(tutor.data.result)
  return {
    props: {
      profile: response.data.result,
      tutor: tutor.data.result,
    },
    revalidate: 1,
  };
};

export default UserProfile;
