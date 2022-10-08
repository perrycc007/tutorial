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
    const student = {location:'[]',subject:'[]',availtime:'[]'}
    const getUserid = userStore(state => state.userId);
    const [changes, setChanges]  = useState(false)
    const [studentid, setStudentid] = useState(props.studentid|'')
    const [studentData, setStudentData] = useState(props.cases|'')
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
          userid: getUserid,
          information: newInfo
        })
        // console.log(response.data.result.studentid)
        setStudentid(response.data.result.studentid)
        setStudentData(newInfo)
        console.log('newInfo',newInfo, studentData)
      }


    async function listHandler(value,type){
      const key = type;
      console.log(key)
      value = JSON.stringify(value)
      const newInfo = {[key]:value}
      setStudentData(newInfo)
      console.log('newInfo',newInfo, studentData)
      const response = await Axios.patch(`http://localhost:3001/student`,{
        
        studentid: studentid,
        information: newInfo
      })
      console.log(response.data.result)
      const match = await Axios.post(`http://localhost:3001/match/student`,{
        studentid: studentid,
        // tutorid: getUserid,
        information: newInfo
      })
      console.log(match.data.result)
    }
    async function studentHandler(value){
      console.log(value)
      const newInfo = {...props.tutor,...value}
      setStudentData(newInfo)
      setChanges(true)
      console.log('newInfo',newInfo, studentData)
      const response = await Axios.patch(`http://localhost:3001/student/`,{
        // userid: 1,
        studentid: studentid,
        information: newInfo
      })
      console.log(response.data.result)
      const match = await Axios.post(`http://localhost:3001/match/student`,{
        studentid: studentid,
        // tutorid: getUserid,
        information: newInfo
      })
      console.log(match.data.result)
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
            {page == 1 && (<LocationForm submitHandler={studentid == ''?firstlistHandler:listHandler} info={studentData}/>)}
            {page == 2 && (<TimeForm submitHandler={listHandler} info={studentData}/>)}
            {page == 3 && (<StudentOthers submitHandler={studentHandler} info={studentData}/>)}
            {page == 4 && (<Subjects submitHandler={listHandler} info={studentData}/>)}
        <Pagination
        count={4}
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