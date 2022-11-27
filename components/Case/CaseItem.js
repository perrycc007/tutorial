
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

const toggleFavoriteStatusHandler=()=>{
  props.toggleFavourite(props.id)
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
            {props.isFavourite? 'Remove from Favorites' : 'To Favorites'}
          </button>}
          {props.type=='cases' &&<button onClick={toggleFavoriteStatusHandler}>
            {props.isFavourite? 'Remove from Favorites' : 'To Favorites'}
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
