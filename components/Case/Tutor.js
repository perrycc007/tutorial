import CaseList from "./CaseList";
import axios from "axios";
import userStore from "../../stores/stores";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import Axios from "axios";
import classes from "./Student.module.css";
import Banner from "../Layout/Banner";

const Tutor = (props) => {
  const url = "http://localhost:3001/favourite/tutor";
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
      <Banner title="G" description="G"></Banner>
      <div className={classes.filter}>
        {!props.Favourite && <Filter FilterHanlder={tutorFilter} />}
      </div>
      {!filtered && (
        <CaseList
          cases={props.cases}
          type="tutor"
          favourite={FavouriteTutor}
          toggleFavouriteHandler={toggleFavouriteTopHandler}
        />
      )}
      {filtered && (
        <CaseList
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
