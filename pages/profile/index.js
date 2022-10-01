import * as React from 'react';
import Axios from 'axios';
import ProfileForm from '../../components/Form/ProfileForm';

const UserProfile = (props) => {
  return (
    <>

      <ProfileForm  profile={props.profile} student={props.student} tutor={props.tutor}/>
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const response = await Axios.get(`http://localhost:3001/profile/${1}`,)
  // const student = await Axios.get(`http://localhost:3001/student/${1}`,)
  const tutor = await Axios.get(`http://localhost:3001/tutor/${1}`,)
  console.log(response.data.tutor)
  return {
    props: {
      profile: response.data.result,
      // student: student.data.result,
      tutor: tutor.data.result
    },
    revalidate: 1,
  };
};

export default UserProfile;
