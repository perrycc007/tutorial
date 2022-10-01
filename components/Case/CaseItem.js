
import Card from '../Layout/Card';
import classes from './CaseItem.module.css';
import userStore from '../../stores/stores';
import Axios from "axios";
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';


function CaseItem(props) {
  const getUserid = userStore(state => state.userId);
  const getClose = userStore(state => state.close);
  const Favourite = userStore(state => state.favouriteTutor)
  const [studentid,setStudentid] = useState()
  // console.log(Favourite)
  let url = 'http://localhost:3001/favourite/tutor'
  let id = ''
  const initiate = () =>{
    if(props.type == 'tutor'){

       url = 'http://localhost:3001/favourite/tutor'
       id = props.tutorid
      //  console.log(Favourite,url,id)
    }else if(props.type == 'cases'){

       url = 'http://localhost:3001/favourite/case'
       id = props.studentid
      //  console.log(Favourite,url,id)
    }}
 
  const addFavouriteTutor = userStore (state => state.addFavouriteTutor)
  const removeFavouriteTutor = userStore (state => state.removeFavouriteTutor)
  const fetchFavouriteTutor = userStore (state => state.fetchFavouriteTutor)
  const fetchFavouriteCases = userStore (state => state.fetchFavouriteCases)
  const [isEdit,setIsEdit] = useState()
  useEffect(() => {
    setStudentid(props.cases.studentid)
    if(props.type == 'tutor'){
      fetchFavouriteTutor()
      initiate()
  }else if(props.type == 'cases'){
      fetchFavouriteCases()
      initiate()
  }
  },[])
  useEffect(() => {

  },[toggleFavoriteStatusHandler,Favourite])

  function itemIsFavoriteHandler(tutorId) {
    const isFavourite = Favourite ? Favourite.some(caseItem => caseItem == tutorId):[]
    // console.log(isFavourite)
    return isFavourite;
  }
 
  async function removeFromFavorite(newFavourite){


    const res = await Axios.patch(url, 
    {tutorid: newFavourite,
    userid: getUserid}
  )
    // console.log(res.data.result);
    return (res)}
  

    async function addToFavorite(newFavourite){
      const res = await Axios.patch(url, 
      {tutorid: newFavourite,
      userid: getUserid}
    )

      // console.log(res.data.result);
      return (res)}



  function toggleFavoriteStatusHandler() {
    if (itemIsFavoriteHandler(props.cases.tutorid)) {
        removeFavouriteTutor(props.cases.tutorid)
        const newFavourite = (tutorid) => {
          return Favourite.filter(favourite => favourite !== tutorid)
        }
        // console.log(newFavourite(props.cases.tutorid))
        removeFromFavorite(newFavourite(props.cases.tutorid));
    }
     else {
      addFavouriteTutor(props.cases.tutorid)
      const newFavourite = [...Favourite ,props.cases.tutorid]
      addToFavorite(newFavourite);

    }
  }

const CloseHandler =()=>{

}


const items = props.cases
const item = Object.entries(items).map((key,value)=>{return(key)})
// console.log(items)
const heading = item.slice(0,5)
const sumamry = item.slice(6,10)
// heading.map((item)=>{console.log(item[1])})
// console.log(heading)
  return (
    <div className={classes.item}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"   
          > 
          <div className={classes.heading}>
            {/* <p>{heading}</p> */}
          {heading.map((item)=><p>{item[1]}</p>)}
          {/* <p>{props}</p> */}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {sumamry.map((item)=><p>{item[1]}</p>)}
          </Typography>          
          {props.type=='tutor'|'cases' &&<button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavoriteHandler(props.cases.tutorid)? 'Remove from Favorites' : 'To Favorites'}
          </button>}
          {props.type=='edit' && <div><button onClick={CloseHandler}>Close
            {/* {ItemIsCloaseHandler(props.cases.tutorid)? 'Close' : 'Open'} */}
          </button>
          <div><Link href={`/edit/${studentid}`}>Edit</Link></div></div>}
        </AccordionDetails>
      </Accordion>


    </div>
  );
}



export default CaseItem;
