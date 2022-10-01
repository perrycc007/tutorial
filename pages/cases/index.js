import CasesList from '../../components/CasesList'
import axios from 'axios';
import Filter from '../../components/Filter';
const Cases = (props) => {
  console.log(props.cases)
  return (
    <>
        <Filter/>
         <CasesList 
         cases={props.cases}
         type = 'cases'
         />
    </>
  );
}


export async function getStaticProps() {
  // fetch data from an API
  const response = await axios.get(`http://localhost:3001/cases`)
  // const result = response? response.data.result : []
  console.log(response.data,'frontend')
  return {
    props: {
      cases: response.data
    },
    revalidate: 1,
  };
};

export default Cases;