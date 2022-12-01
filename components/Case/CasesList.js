import { useState } from "react";
import CaseItem from "./CaseItem";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Layout/usePagination";
import classes from "./CasesList.module.css";

// And now we can use these
const CasesList = (props) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = props.admin ? 15 : 4;
  const count = Math.ceil(props.cases.length / PER_PAGE);
  const _DATA = usePagination(props.cases, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const checking = props.adminInfo.checking;
  const checked = props.adminInfo.checked;
  const notavailtutor = props.adminInfo.notavailtutor;
  const UpdateCheckHandler = (idmatch, tutorid, checkStatus) => {
    switch (checkStatus) {
      case "checking":
        checking = checking.filter((item) => item != tutorid);
        checked.push(tutorid);
        console.log("checking", checking, "checked", checked);
        props.toggleCheckHandler(idmatch, checked, checking);
        break;
      case "checked":
        checked = checked.filter((item) => item != tutorid);
        console.log("checking", checking, "checked", checked);
        props.toggleCheckHandler(idmatch, checking, checked);
        break;
      case "not yet checked":
        checking.push(tutorid);
        console.log("checking", checking, "checked", checked);
        props.toggleCheckHandler(idmatch, checked, checking);
        break;
    }
  };

  const toggleAvailHandler = (status, idmatch, tutorid) => {
    if (status) {
      notavailtutor.push(tutorid);
      props.toggleAvailHandler(idmatch, notavailtutor);
    } else {
      notavailtutor = notavailtutor.filter((item) => item != tutorid);
      props.toggleAvailHandler(idmatch, notavailtutor);
    }
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
                  idmatch={props.idmatch}
                  admin={props.admin ? props.admin : ""}
                  adminInfo={props.adminInfo ? props.adminInfo : {}}
                  toggleStatus={
                    props.toggleStatusHandler ? props.toggleStatusHandler : ""
                  }
                  toggleFavourite={props.toggleFavouriteHandler}
                  toggleAvail={toggleAvailHandler}
                  toggleCheck={UpdateCheckHandler}
                  notAvailStatus={
                    props.adminInfo
                      ? props.adminInfo.notavailtutor.includes(oneCase.tutorid)
                      : false
                  }
                  checkedStatus={
                    props.adminInfo
                      ? props.adminInfo.checked.includes(oneCase.tutorid)
                      : false
                  }
                  checkingStatus={
                    props.adminInfo
                      ? props.adminInfo.checking.includes(oneCase.tutorid)
                      : false
                  }
                  isFavourite={
                    props.favourite
                      ? props.favourite.includes(
                          props.type == "tutor"
                            ? oneCase.tutorid
                            : oneCase.studentid
                        )
                      : ""
                  }
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
