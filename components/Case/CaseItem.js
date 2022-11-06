
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
import EditForm from '../Form/Forms/EditForm';

function CaseItem(props) {
  const getUserid = userStore(state => state.userId);
  const getClose = userStore(state => state.close);
  const FavouriteTutor = userStore(state => state.favouriteTutor)
  const FavouriteCases = userStore(state => state.favouriteCase)
  // console.log(Favourite)
  let url = 'http://localhost:3001/favourite/tutor'
  let id = ''
  const initiate = () =>{
    if(props.type == 'tutor'){
       url = 'http://localhost:3001/favourite/tutor'
       id = props.id
      //  console.log(Favourite,url,id)
    }else if(props.type == 'cases'){
       url = 'http://localhost:3001/favourite/case'
       id = props.id
      //  console.log(Favourite,url,id)
    }}
 
  const addFavouriteTutor = userStore (state => state.addFavouriteTutor)
  const removeFavouriteTutor = userStore (state => state.removeFavouriteTutor)
  const addFavouriteCase = userStore (state => state.addFavouriteCase)
  const removeFavouriteCase = userStore (state => state.removeFavouriteCase)


  const fetchFavouriteTutor = userStore (state => state.fetchFavouriteTutor)
  const fetchFavouriteCase = userStore (state => state.fetchFavouriteCases)
  const [isEdit,setIsEdit] = useState()
  useEffect(() => {
    if(props.type == 'tutor'){
      fetchFavouriteTutor()
      initiate()
  }else if(props.type == 'cases'){
      fetchFavouriteCase()
      initiate()
  }
  },[])
  useEffect(() => {

  },[toggleFavoriteStatusHandler,FavouriteTutor,FavouriteCases])

  function itemIsFavoriteHandler(id) {
    if(props.type == 'tutor'){
    const isFavourite = FavouriteTutor ? FavouriteTutor.some(caseItem => caseItem == id):[]
    return isFavourite;
    }else if(props.type == 'cases'){
    const isFavourite = FavouriteCases ? FavouriteCases.some(caseItem => caseItem == id):[]
    return isFavourite;
    }
    // console.log(isFavourite)

  }
 
  async function removeFromFavorite(newFavourite){
    const res = await Axios.patch(url, 
    {caseid: newFavourite,
    userid: getUserid}
  )
    // console.log(res.data.result);
    return (res)}
  

    async function addToFavorite(newFavourite){
      const res = await Axios.patch(url, 
      {caseid: newFavourite,
      userid: getUserid}
    )

      // console.log(res.data.result);
      return (res)}



  function toggleFavoriteStatusHandler() {
    if (itemIsFavoriteHandler(props.id)) {
      if(props.type == 'tutor'){

        removeFavouriteTutor(props.id)
      }else if(props.type == 'cases'){
        removeFavouriteCase(props.id)
      }

        const newFavourite = (id) => {
          if(props.type == 'tutor'){
              return FavouriteTutor.filter(favourite => favourite !== id)
            }else if(props.type == 'cases'){
              return FavouriteCases.filter(favourite => favourite !== id)
            }

        }
        // console.log(newFavourite(props.cases.tutorid))
        removeFromFavorite(newFavourite(props.id));
    }
     else {
      if(props.type == 'tutor'){
        addFavouriteTutor(props.id)
        const newFavourite = [...FavouriteTutor ,props.id]
        addToFavorite(newFavourite);
      }else if(props.type == 'cases'){
        addFavouriteCase(props.id)
        const newFavourite = [...FavouriteCases ,props.id]
        addToFavorite(newFavourite);
      }
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
          {props.type=='tutor' &&<button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavoriteHandler(props.cases.tutorid)? 'Remove from Favorites' : 'To Favorites'}
          </button>}
          {props.type=='cases' &&<button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavoriteHandler(props.cases.studentid)? 'Remove from Favorites' : 'To Favorites'}
          </button>}
          {props.type=='edit' && <div><button onClick={CloseHandler}>Close
            {/* {ItemIsCloaseHandler(props.cases.tutorid)? 'Close' : 'Open'} */}
          </button>
          <div>
            {/* <Link href={`/edit/${studentid}`}>Edit</Link> */}
            <EditForm cases={props.cases}/>
            </div></div>}
        </AccordionDetails>
      </Accordion>


    </div>
  );
}



export default CaseItem;
