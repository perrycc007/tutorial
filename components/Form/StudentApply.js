import React, { useState, useEffect } from 'react';
import StudentOthers from './Forms/StudentOthers'
import LocationForm from './Forms/LocationForm'
import Subjects from './Forms/Subjects'
import TimeForm from './Forms/TimeForm'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import userStore from '../../stores/stores';

import Axios from "axios";
const StudentApply = (props) => {
    const isTutor = false
    const student = {location:'[]',subject:'[]',availtime:'[]'}
    const getUserid = userStore(state => state.userId);
    const [studentid, setStudentid] = useState('')
    const [page, setPage] = useState(1)
    const handleChange = (e, p) => {
        setPage(p)
      };

    useEffect(() => {
      props.studentid?setStudentid(props.studentid):''
    },[]);
      async function firstlistHandler(value,type){
        const key = type;
        console.log(key)
        value = JSON.stringify(value)
        const newInfo = {[key]:value}
        const response = await Axios.post(`http://localhost:3001/student`,{
          userid: 1,
          information: newInfo
        })
        console.log(response.data.result.studentid)
        setStudentid(response.data.result.studentid)
      }


    async function listHandler(value,type){
      const key = type;
      console.log(key)
      value = JSON.stringify(value)
      const newInfo = {[key]:value}
      const response = await Axios.patch(`http://localhost:3001/student`,{
        studentid: studentid,
        information: newInfo
      })
      console.log(response.data.result)
    }

    return(
        <div>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center"
      }}
         >
        <Paper
      sx={{padding:'3rem'}}>
            {page == 1 && (<LocationForm submitHandler={studentid == ''?firstlistHandler:listHandler} location={student}/>)}
            {page == 2 && (<div><TimeForm submitHandler={listHandler} info={student}/> <StudentOthers submitHandler={listHandler} info={student}/></div> )}
            {page == 3 && (<Subjects submitHandler={listHandler} info={student}/>)}
        <Pagination
        count={3}
        page={page}
        onChange={handleChange}
        variant="outlined" 
        color="primary"
      />
        </Paper>      
    </Box>
        </div>        
    )
}


export default StudentApply;