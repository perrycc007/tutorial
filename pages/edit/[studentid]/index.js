import StudentApply from '../../../components/Form/StudentApply'
import { Fragment } from 'react';
import axios from 'axios';
import { Propane } from '@mui/icons-material';


function EditCase(props) {    
  console.log(props.cases)
  return (
    <Fragment>
        <StudentApply cases={props.cases} studentid={props.studentid}></StudentApply>
    </Fragment>
  );
}

export async function getStaticPaths() {

//   // const res = await Axios.get('https://localhost:3001/cases')
//   // const cases = await  res.json()
//   // console.log(cases)

//   // const paths = cases.map((cases) => ({
//   //   params: { casesid: cases.studentid },
//   // }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
  return { 
    paths: []
  , fallback: true }
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const { params } = context;

  const response = await axios.get(`http://localhost:3001/cases/${params.studentid}`)
  console.log(response.data)
  return {
    props: {
      cases: response.data,
      studentid: params.studentid
          },  
    revalidate: 1,
    }
  };

export default EditCase;
