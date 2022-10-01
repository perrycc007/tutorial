import React, { useState, useEffect } from 'react';
import BasicInfo from './Forms/BasicInfo'
import EducationForm from './Forms/EducationForm'
import Grade from './Forms/Grade'
import LocationForm from './Forms/LocationForm'
import Subjects from './Forms/Subjects'
import TimeForm from './Forms/TimeForm'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import userStore from '../../stores/stores';
import Axios from "axios";
const ProfileForm = (props) => {
    const [isTutor, setIsTutor] = useState(true)
    const [profileData, setProfileData] = useState()

    const [studentData, setStudentData] = useState()

    const [tutorData, setTutorData] = useState()
    const [changes, setChanges]  = useState(false)
    // const [info, setInfo] = useState({})
    const getUserid = userStore(state => state.userId);
    const [page, setPage] = useState(1)
    const handleChange = (e, p) => {
        setPage(p);
      };
    // async function getProfile(){
    //   const response = await Axios.get(`http://localhost:3001/profile/${1}`,)
    //   console.log(response.data.result)
    //   setInfo(response.data.result)
    //   return response.data.result}
    //   useEffect(() => {
    //     getProfile()
    //   } 
    //   , []);
      console.log(props.tutor)
      async function submitHandler(value){
      console.log(value)
      const newInfo = {...props.profile,...value}
      setProfileData(newInfo)
      setChanges(true)
      const response = await Axios.post(`http://localhost:3001/profile/`,{
        userid: 1,
        tutorid: 1,
        information: newInfo
      })
      console.log(response.data.result)
    }
    async function listHandler(value,type){
      const key = type;
      console.log(key)
      const info = isTutor?props.tutor:props.student;
      value = JSON.stringify(value)
      const newInfo = {...info,[key]:value}
      isTutor?setTutorData(newInfo):setStudentData(newInfo)
      setChanges(true)
      const response = await Axios.patch(`http://localhost:3001/${isTutor?'tutor':'student'}/`,{
        userid: 1,
        information: newInfo
      })
      console.log(response.data.result)
    }
    async function tutorHandler(value){
      console.log(value)
      const newInfo = {...props.tutor,...value}
      setTutorData(newInfo)
      setChanges(true)
      const response = await Axios.patch(`http://localhost:3001/tutor/`,{
        userid: 1,
        tutorid: 1,
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
            {page == 1 && (<BasicInfo submitHandler={submitHandler} info={changes?profileData:props.profile}/>)}
            {page == 2 && (<LocationForm submitHandler={listHandler} location={isTutor?changes?tutorData:props.tutor:changes?studentData:props.student} isTutor={isTutor}/>)}
            {page == 3 && (<TimeForm submitHandler={listHandler} info={changes?tutorData:props.tutor}/>)}
            {page == 4 && (<EducationForm submitHandler={tutorHandler} info={changes?tutorData:props.tutor}/>)}
            {page == 5 && (<Grade submitHandler={listHandler} info={changes?tutorData:props.tutor}/>)}
            {page == 6 && (<Subjects submitHandler={listHandler} info={changes?tutorData:props.tutor}/>)}
        <Pagination
        count={isTutor?6:2}
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


export default ProfileForm;