import { useEffect, useState } from "react";
import userStore from "../stores/stores";
import CaseItem from "./Case/CaseItem";
import Axios from "axios";
import ToggleButtons from "./InputTool/ToggleSwitch";
import Student from "./Case/Student";
import Tutor from "./Case/Tutor";

// And now we can use these
const FavouriteList = () => {
  const [type, setType] = useState("Cases");
  const getUserid = userStore((state) => state.userId);

  const [favouriteCase, setFavouriteCase] = useState([]);
  const [favouriteTutor, setFavouriteTutor] = useState([]);
  const typeMode = (type) => {
    setType(type);
  };
  async function getFavouriteTutorList() {
    const response = await Axios.post(
      `http://localhost:3001/tutor/getFavouriteCase/${getUserid}`
    );
    setFavouriteTutor(response.data.result);
    return response.data.result;
  }
  async function getFavouriteStudentList() {
    const response = await Axios.post(
      `http://localhost:3001/cases/getFavouriteCase/${getUserid}`
    );
    setFavouriteCase(response.data.result);
    return response.data.result;
  }

  useEffect(() => {
    getFavouriteTutorList();
    getFavouriteStudentList();
  }, []);

  return (
    <>
      <ToggleButtons typeHandler={typeMode} />
      <h1>Favourite</h1>
      {type == "Cases" ? (
        <Student cases={favouriteCase} Favourite={true} />
      ) : (
        <Tutor cases={favouriteTutor} Favourite={true} />
      )}
    </>
  );
};

export default FavouriteList;
