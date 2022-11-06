import CasesList from '../../components/CasesList'
import axios from 'axios';
import Filter from '../../components/Filter';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';


const AdminResult = () => {
    const [result, setResult] = useState();
  async function getResult(){
    const response = await axios.get(`http://localhost:3001/result`)
    // setResult(response.data)
    // console.log(response.data)
    setResult(response.data)
    return response.data
    response.data.map((item)=>{
      console.log(item)
      console.log(item.availtutor)
      console.log(item.tutor)
    })
  }
  useEffect(() => {getResult()},[])
//   const [filtered, setFiltered] = useState(false)
//   const [filteredList, setFilteredList] = useState([])


//   async function tutorFilter(preference){
//     const result = await axios.post(`http://localhost:3001/tutor`,{
//       preference
//     })
//     console.log(result.data)
//     setFiltered(true)
//     setFilteredList(result.data)
//   }

  return (
    <>
      {/* {result.map(()=>{<ol>

      </ol>})} */}
     
      {result.map((detail)=>{
          <p>{detail}</p>
      })}
     
    </>
  );
}


// export async function getStaticProps() {
//   // fetch data from an API
//   const response = await axios.get(`http://localhost:3001/result`)
// //   const result = response? response.data.result:''
// //   console.log(response.count)
//   // const count = response? response.data.count:''
//   return {
//     props: {
//       result: response,
//     },
//     revalidate: 1,
//   };
// };

export default AdminResult;