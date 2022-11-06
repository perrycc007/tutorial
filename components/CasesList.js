import { useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
import useStore from '../stores/stores';
import CaseItem from './Case/CaseItem';
import Pagination from '@mui/material/Pagination';
// import Checkbox from '../../InputTool/Checkbox';
import Select from '@mui/material/Select';
// import TextInput from '../../InputTool/Input';
// import * as Yup from 'yup';
import Axios from "axios";
import usePagination from "./Layout/usePagination";
import classes from './CasesList.module.css'

// And now we can use these
const CasesList = (props) => {
  const getUserid = useStore(state => state.userId);
  const [subject, setSubject] = useState();
  let [page, setPage] = useState(1);
  const [cases, setCases] = useState(props.cases);
  const [edit, setEdit] = useState(true);
  const PER_PAGE = 2;
  const count = Math.ceil(cases.length / PER_PAGE);
  const _DATA = usePagination(cases, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };



  return (
    <>
    <setion className={classes.wrapper}>
      {_DATA.currentData().map((oneCase)=>
      <CaseItem key={oneCase.tutorid?oneCase.tutorid:oneCase.studentid} 
                id={oneCase.tutorid?oneCase.tutorid:oneCase.studentid} 
                cases={oneCase}
                type={props.type} />)
                }
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined" 
        color="primary"
      />
      </setion>
    </>
  );
};



export default CasesList;