import CasesList from '../../components/CasesList'
import axios from 'axios';
import Filter from '../../components/Filter';
import { useState } from 'react';
const Cases = (props) => {
  const [filtered, setFiltered] = useState(false)
  const [filteredList, setFilteredList] = useState([])


  async function casesFilter(preference){
    const result = await axios.post(`http://localhost:3001/cases`,{
      preference
    })
    console.log(result.data)
    setFiltered(true)
    setFilteredList(result.data)
  }

  return (
    <>
        <Filter FilterHanlder={casesFilter}/>
         {!filtered && <CasesList 
         cases={props.cases}
         type = 'cases'
         />}
         {filtered && <CasesList 
         cases={filteredList}
         type = 'cases'
         />}

    </>
  );
}


export async function getStaticProps() {
  // fetch data from an API
  const response = await axios.get(`http://localhost:3001/cases`)
  const result = response? response.data.result:''

  return {
    props: {
      cases: result
    },
    revalidate: 1,
  };
};

export default Cases;