import AdminDisplay from "../../components/AdminDisplay/AdminDisplay";
import axios from "axios";
import NoSSR from "react-no-ssr";
import Pagination from "@mui/material/Pagination";
import LoadingScreen from "../../components/Layout/LoadingScreen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./adminResult.module.css";
import { useEffect, useState, useRef } from "react";
const Result = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalNumberofPage, setTotalNumberofPage] = useState(1);
  const [item, setItem] = useState([]);
  const studentidRef = useRef();
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

  useEffect(() => {
    getMatchResult(page);
  }, [page]);
  return (
    <div>
      <NoSSR>
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
      </NoSSR>
    </div>
  );
};

export default Result;
