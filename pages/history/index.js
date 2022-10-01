import CasesList from '../../components/CasesList'
import axios from 'axios';
const Cases = (props) => {
  console.log(props.cases)
  return (
    <>
        <p>CasesList</p>
         <CasesList cases={props.cases} type='edit'/>
    </>
  );
}


export async function getStaticProps() {
  // fetch data from an API
  const response = await axios.get(`http://localhost:3001/history/1`)
  return {
    props: {
      cases: response.data.result
    },
    revalidate: 1,
  };
};

export default Cases;