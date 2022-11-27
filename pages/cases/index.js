import axios from "axios";
import Student from '../../components/Case/Student'
const Cases = (props) => {
  return (
    <>
      <Student cases={props.cases}/>
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const response = await axios.get(`http://localhost:3001/cases`);
  const result = response ? response.data.result : "";

  return {
    props: {
      cases: result,
    },
    revalidate: 1,
  };
}

export default Cases;
