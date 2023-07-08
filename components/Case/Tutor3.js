import CasesList from "./CasesList";
import axios from "axios";
import userStore from "../../stores/stores";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import Axios from "axios";
import classes from "./Student.module.css";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Layout/usePagination";
import classes from "./CasesList.module.css";

const Tutor = (props) => {
  const url = "http://localhost:3001/favourite/tutor";
  let [page, setPage] = useState(1);
  const PER_PAGE = 15;
  const count =
    props.cases != undefined ? Math.ceil(props.cases.length / PER_PAGE) : 0;
  const _DATA = usePagination(props.cases, PER_PAGE);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    if (!props.admin) {
      handleClick();
    }
  };



  const [filtered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const getUserid = userStore((state) => state.userId);
  const FavouriteTutor = userStore((state) => state.favouriteTutor);
  const setfavouriteTutor = userStore((state) => state.setFavouriteTutor);
  const fetchFavouriteTutor = userStore((state) => state.fetchFavouriteTutor);

  const toggleFavouriteTopHandler = (id) => {
    let newFavourite = FavouriteTutor;
    if (newFavourite.includes(id)) {
      newFavourite = newFavourite.filter((exist) => exist != id);
    } else {
      newFavourite = [...newFavourite, id];
    }
    setfavouriteTutor(newFavourite);

    async function UpdateFavorite(newFavourite) {
      const res = await Axios.patch(url, {
        caseid: newFavourite,
        userid: getUserid,
      });
      // console.log(res.data.result);
      return res;
    }
    UpdateFavorite(newFavourite);
  };

  useEffect(() => {
    fetchFavouriteTutor(getUserid);
  }, []);

  async function tutorFilter(preference) {
    const result = await axios.post(`http://localhost:3001/tutor`, {
      preference,
    });
    console.log(result.data);
    setFiltered(true);
    setFilteredList(result.data);
  }

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        {!props.Favourite && <Filter FilterHanlder={tutorFilter} />}
      </div>
      {!filtered && 



        <CasesList
          cases={props.cases}
          type="tutor"
          favourite={FavouriteTutor}
          toggleFavouriteHandler={toggleFavouriteTopHandler}
        />
      }
      {filtered && (
        <CasesList
          cases={filteredList}
          type="tutor"
          favourite={FavouriteTutor}
          toggleFavouriteHandler={toggleFavouriteTopHandler}
        />
      )}
    </div>
  );
};
export default Tutor;
