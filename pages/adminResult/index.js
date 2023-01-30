import AdminDisplay from "../../components/AdminDisplay/AdminDisplay";
import axios from "axios";
import NoSSR from "react-no-ssr";
import Pagination from "@mui/material/Pagination";
import classes from "../../components/Form/ProfileForm.module.css";
import LoadingScreen from "../../components/Layout/LoadingScreen";
import { useEffect, useState } from "react";
const Result = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalNumberofPage, setTotalNumberofPage] = useState(1);
  const [item, setItem] = useState([]);
  const handleChange = (e, p) => {
    setPage(p);
  };
  async function getMatchResult(page) {
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

  useEffect(() => {
    getMatchResult(page);
  }, [page]);
  return (
    <div>
      <NoSSR>
        {loading && <LoadingScreen />}
        {!loading && <AdminDisplay match={item} />}
        {!loading && (
          <div className={classes.pagination}>
            <Pagination
              size="small"
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
