import React, {useState, useEffect} from 'react';
import { Grid, Typography } from '@mui/material';
import BasicTabs from '../../ui/BasicTabs';
import place from './Location'



const LocationForm = (props) => 
{
  
const [list, setList] = useState([])
useEffect(() => {
props.location && console.log(JSON.parse(props.location.location))
props.location && setList(JSON.parse(props.location.location))
console.log(list)
},[props.location]);


const listHandlerHandler = (value) => {
  setList(value)
  console.log(list)
}
const submitHandler =(e) =>{
  e.preventDefault()
  console.log(list)
  props.submitHandler(list,'location')
}
  return (
    <React.Fragment>
      <p>{props.isTutor?'where can you teach':'where do you live'}</p>
      <form  onSubmit={submitHandler}>
        <BasicTabs category={place} listHandler={listHandlerHandler} passValue={list}/>
        <button type="submit">{props.isTutor?'儲存並下一步':'儲存並開始申請'}</button>
      </form>
    </React.Fragment>
  );
};
export default LocationForm;