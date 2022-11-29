import { useState } from "react";
import CaseItem from "./CaseItem";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Layout/usePagination";
import classes from "./CasesList.module.css";

// And now we can use these
const CasesList = (props) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = props.admin?15:4;
  const count = Math.ceil(props.cases.length / PER_PAGE);
  const _DATA = usePagination(props.cases, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <setion className={classes.wrapper}>
        {props.cases
          ? _DATA
              .currentData()
              .map((oneCase) => (
                <CaseItem
                  key={
                    props.type == "tutor" ? oneCase.tutorid : oneCase.studentid
                  }
                  id={
                    props.type == "tutor" ? oneCase.tutorid : oneCase.studentid
                  }
                  cases={oneCase}
                  type={props.type}
                  admin={props.admin?props.admin:''}
                  adminInfo={props.adminInfo?props.adminInfo:{}}
                  toggleStatus={props.toggleStatusHandler?props.toggleStatusHandler:''}
                  toggleFavourite={props.toggleFavouriteHandler}
                  toggleAvail={props.toggleAvailHandler}
                  toggleCheck={props.toggleCheckHandler}
                  checkedStatus={props.checked?props.checked.includes(oneCase.tutorid):false}
                  checkingStatus={props.checking?props.checking.includes(oneCase.tutorid):false}
                  isFavourite={props.favourite?props.favourite.includes(
                    props.type == "tutor" ? oneCase.tutorid : oneCase.studentid
                  ):''}
                />
              ))
          : []}
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
