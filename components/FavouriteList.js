import { useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
import useStore from '../stores/stores';
import CaseItem from './Case/CaseItem';
// import Checkbox from '../../InputTool/Checkbox';

// import TextInput from '../../InputTool/Input';
// import * as Yup from 'yup';
import Axios from "axios";


// And now we can use these
const FavouriteList = () => {
    const getUserid = useStore(state => state.userId);
    const getFavouriteTutor = useStore (state=> state.favouriteTutor)
    console.log(getFavouriteTutor)
    const [favourite, setFavourite] = useState([]);

  async function getFavouriteTutorList(tutorID){
    console.log(tutorID)
    const response = await Axios.post(`http://localhost:3001/tutor/getFavouriteCase`,{
      tutoridList : getFavouriteTutor
    })
    console.log(response.data.result)
    setFavourite(response.data.result)
    return response.data.result}

  useEffect(() => {
    getFavouriteTutorList(getFavouriteTutor)
    console.log(getFavouriteTutor)

  } 
  , [getFavouriteTutor]);



  return (
    <>
      <h1>Favourite</h1>
    {favourite.map((oneCase)=>
    <CaseItem key={oneCase.idapply} 
              id={oneCase.idapply}
              cases={oneCase}
              type='tutor'
/>)}
    </>
  );
};



export default FavouriteList;