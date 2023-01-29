import React, {useState ,useEffect} from 'react';
import BasicTabs from '../../ui/BasicTabs';
import subjects from './Subject'
import Button from '@mui/material/Button';





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
      <h2>申請補習科目</h2>
      <form  onSubmit={submitHandler}>
        <BasicTabs category={subjects} listHandler={listHandlerHandler} passValue={list}/>
        <Button variant="outlined" type="submit">儲存</Button>
      </form>
    </React.Fragment>
  );
};
export default SubjectsForm;