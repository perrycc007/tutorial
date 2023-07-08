import AdminDisplay from "../../components/AdminDisplay/AdminDisplay";
import axios from "axios";
import NoSSR from "react-no-ssr";
import Pagination from "@mui/material/Pagination";
import LoadingScreen from "../../components/Layout/LoadingScreen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./adminResult.module.css";
import { useEffect, useState, useRef } from "react";
import CaseItemAdminTutor from "../../components/Case/CaseItemAdminTutor";
const Result = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalNumberofPage, setTotalNumberofPage] = useState(1);
  const [item, setItem] = useState([]);
  const studentidRef = useRef();
  const tutoridRef = useRef();
  const [tutor, setTutor] = useState(undefined);
  // const enteredStudentId = studentidRef.current?.value;
  const handleChange = (e, p) => {
    setPage(p);
  };
  async function getMatchResult(page) {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:3001/result/${page - 1}`
    );
    console.log(response.data[0]);
    setItem(response.data[0]);
    setTotalNumberofPage(response.data[1].totalNumberofMatch);
    if (response.status == 200) {
      setLoading(false);
    }
    return response.data;
  }

  async function getSingleMatchResult() {
    const enteredStudentId = studentidRef.current?.value;
    console.log(enteredStudentId);
    if ((enteredStudentId == undefined) | (enteredStudentId == "")) {
      return;
    } else {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/result/studentid/${enteredStudentId}`
      );
      console.log(response);
      if (response.data == "error") {
        setItem(undefined);
      } else {
        setItem(response.data[0]);
      }
      if (response.status == 200) {
        setLoading(false);
        setTotalNumberofPage(1);
      }

      return response.data;
    }
  }

  async function getTutor() {
    const enteredTutorId = tutoridRef.current?.value;
    console.log(enteredTutorId);
    setLoading(true);
    const response = await axios.get(
      `http://localhost:3001/tutor/${enteredTutorId}`
    );
    console.log(response.data.result);
    setTutor(response.data.result);
    if (response.status == 200) {
      setLoading(false);
    }
    return response.data;
  }

  async function toggleStatus(id, status, type) {
    const response = await axios.patch(
      `http://localhost:3001/history/updateTutorStatus`,
      {
        tutorid: id,
        status: status,
      }
    );
    response.data.result;
  }


  async function toggleVerify(id, verify, type) {
    const response = await Axios.patch(
      `http://localhost:3001/admin/updateTutorVerify`,
      {
        tutorid: id,
        verify: verify,
      }
    );
    response.data.result;
  }

  useEffect(() => {
    getMatchResult(page);
  }, [page]);
  return (
    <div>
      <NoSSR>
        <h1 className={classes.h1}>補習搜尋</h1>
        {loading && <LoadingScreen />}
        {!loading && (
          <div className={classes.searchbar}>
            <TextField inputRef={studentidRef} />{" "}
            <Button onClick={getSingleMatchResult}>Search</Button>
          </div>
        )}
        {!loading && item && <AdminDisplay match={item} />}
        {!loading && (
          <div className={classes.pagination}>
            <Pagination
              size="large"
              count={totalNumberofPage}
              page={page}
              onChange={handleChange}
              variant="outlined"
              color="primary"
            />
          </div>
        )}

        <h1 className={classes.h1}>導師搜尋</h1>
        {!loading && (
          <div className={classes.searchbar}>
            <TextField inputRef={tutoridRef} />
            <Button onClick={getTutor}>Search</Button>
          </div>
        )}
        {!loading && tutor && (
          <CaseItemAdminTutor
            cases={tutor}
            type="tutor"
            admin="admin"
            toggleStatus={toggleStatus}
            toggleVerify={toggleVerify}
          />
        )}
      </NoSSR>
    </div>
  );
};

export default Result;
