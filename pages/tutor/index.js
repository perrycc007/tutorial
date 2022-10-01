import CasesList from '../../components/CasesList'
import axios from 'axios';
import Filter from '../../components/Filter';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';


const Cases = (props) => {
  const [filtered, setFiltered] = useState(false)
  const [filteredList, setFilteredList] = useState([])


  async function tutorFilter(preference){
    const result = await axios.post(`http://localhost:3001/tutor`,{
      preference
    })
    console.log(result.data)
    setFiltered(true)
    setFilteredList(result.data)
  }

  return (
    <>
        <Filter tutorFilterHanlder={tutorFilter}/>
         {!filtered && <CasesList 
         cases={props.cases}
         type = 'tutor'
         />}
         {filtered && <CasesList 
         cases={filteredList}
         type = 'tutor'
         />}

    </>
  );
}


export async function getStaticProps() {
  // fetch data from an API
  const response = await axios.get(`http://localhost:3001/tutor?limit=20&skip=0`)
  const result = response? response.data.result:''
  console.log(response.count)
  // const count = response? response.data.count:''
  return {
    props: {
      cases: result,
    },
    revalidate: 1,
  };
};

export default Cases;