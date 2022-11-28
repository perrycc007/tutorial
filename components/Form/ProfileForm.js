import React, { useState, useEffect } from "react";
import BasicInfo from "./Forms/BasicInfo";
import EducationForm from "./Forms/EducationForm";
import Grade from "./Forms/Grade";
import LocationForm from "./Forms/LocationForm";
import Subjects from "./Forms/Subjects";
import TimeForm from "./Forms/TimeForm";
import Budget from "./Forms/Budget";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import userStore from "../../stores/stores";
import Axios from "axios";
const ProfileForm = (props) => {
  const [profileData, setProfileData] = useState(props.profile);
  const [tutorData, setTutorData] = useState(props.tutor);
  const [changes, setChanges] = useState(false);
  const getUserid = userStore((state) => state.userId);
  const [page, setPage] = useState(1);
  const isTutor = userStore((state) => state.isTutor);
  const toggleIstutor = userStore((state) => state.toggleIstutor);

  const handleChange = (e, p) => {
    setPage(p);
  };

  async function submitHandler(value) {
    console.log(value);
    const info = profileData ? profileData : props.profile;
    const newInfo = { ...info, ...value };
    setProfileData(newInfo);
    setChanges(true);
    const response = await Axios.post(`http://localhost:3001/profile/`, {
      userid: getUserid,
      tutorid: getUserid,
      information: newInfo,
    });
    response.data.result;
  }
  async function listHandler(value, type) {
    const key = type;
    const info = tutorData ? tutorData : props.tutor;
    value = JSON.stringify(value);
    const newInfo = { ...info, [key]: value };
    setTutorData(newInfo);
    setChanges(true);
    const response = await Axios.patch(`http://localhost:3001/tutor/`, {
      userid: getUserid,
      information: newInfo,
    });
    const match = await Axios.post(`http://localhost:3001/match/tutor`, {
      userid: getUserid,
      information: newInfo,
    });
    response.data.result
    match.data.result;
  }
  async function tutorHandler(value) {
    const info = tutorData ? tutorData : props.tutor;
    const newInfo = { ...info, ...value };
    setTutorData(newInfo);
    setChanges(true);
    const response = await Axios.patch(`http://localhost:3001/tutor`, {
      userid: getUserid,
      // tutorid: getUserid,
      information: newInfo,
    });
    const match = await Axios.patch(`http://localhost:3001/match/tutor`, {
      userid: getUserid,
      // tutorid: getUserid,
      information: newInfo,
    });
    match.data.result
  }
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ padding: "3rem" }}>
          {page == 1 && (
            <BasicInfo
              submitHandler={submitHandler}
              info={changes ? profileData : props.profile}
            />
          )}
          {page == 2 && (
            <LocationForm
              submitHandler={listHandler}
              info={changes ? tutorData : props.tutor}
              isTutor={isTutor}
            />
          )}
          {page == 3 && (
            <TimeForm
              submitHandler={listHandler}
              info={changes ? tutorData : props.tutor}
            />
          )}
          {page == 4 && (
            <EducationForm
              submitHandler={tutorHandler}
              info={changes ? tutorData : props.tutor}
            />
          )}
          {page == 5 && (
            <Grade
              submitHandler={listHandler}
              info={changes ? tutorData : props.tutor}
            />
          )}
          {page == 6 && (
            <Subjects
              submitHandler={listHandler}
              info={changes ? tutorData : props.tutor}
            />
          )}
          {page == 7 && (
            <Budget
              submitHandler={tutorHandler}
              info={changes ? tutorData : props.tutor}
            />
          )}

          {isTutor ? (
            <Pagination
              count={7}
              page={page}
              onChange={handleChange}
              variant="outlined"
              color="primary"
            />
          ) : (
            ""
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default ProfileForm;
