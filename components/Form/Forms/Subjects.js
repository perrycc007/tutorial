import React, {useState ,useEffect} from 'react';
import { Grid, Typography } from '@mui/material';
import BasicTabs from '../../ui/BasicTabs';
import subjects from './Subject'






const SubjectsForm = (props) => {
  const [list, setList] = useState([])
  useEffect(() => {
    props.info && props.info.hasOwnProperty('subject')== true ? console.log(JSON.parse(props.info.subject)):''
    props.info && props.info.hasOwnProperty('subject')== true ? setList(JSON.parse(props.info.subject)):''
  },[props.info]);

  const listHandlerHandler = (value) => {
    setList(value)
    console.log(list)
  }
  const submitHandler =(e) =>{
    e.preventDefault()
    console.log(list)
    props.submitHandler(list,'subject')
  }

  return (
    <React.Fragment>
      <form  onSubmit={submitHandler}>
        <BasicTabs category={subjects} listHandler={listHandlerHandler} passValue={list}/>
        <button type="submit">儲存並下一步</button>
      </form>
    </React.Fragment>
  );
};
export default SubjectsForm;