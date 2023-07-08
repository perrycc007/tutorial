import { useEffect, useState } from "react";
import CaseItem from "./CaseItem";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Layout/usePagination";
import classes from "./CasesList.module.css";

// And now we can use these
const CasesList = (props) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count =
    props.cases != undefined ? Math.ceil(props.cases.length / PER_PAGE) : 0;
  const _DATA = usePagination(props.cases, PER_PAGE);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    if (!props.admin) {
      handleClick();
    }
  };
  const [checkingList, setCheckinglist] = useState([]);
  const [checkedList, setCheckedlist] = useState([]);

  useEffect(() => {
    setCheckinglist(props.adminInfo.checking);
    setCheckedlist(props.adminInfo.checked);
  }, [props.adminInfo, props.adminInfo]);

  const UpdateCheckHandler = (idmatch, tutorid, checkStatus) => {
    let checking = checkingList;
    let checked = checkedList;
    switch (checkStatus) {
      case "checking":
        checking = checking.filter((item) => item != tutorid);
        setCheckinglist(checking);
        checked = [...checked, tutorid];
        setCheckedlist(checked);
        console.log("checking", checking, "checked", checked);
        props.toggleCheckHandler(idmatch, checked, checking);
        break;
      case "checked":
        checked = checked.filter((item) => item != tutorid);
        setCheckedlist(checked);
        console.log("checking", checking, "checked", checked);
        props.toggleCheckHandler(idmatch, checking, checked);
        break;
      case "not yet checked":
        checking = [...checking, tutorid];
        setCheckinglist(checking);
        console.log("checking", checking, "checked", checked);
        props.toggleCheckHandler(idmatch, checked, checking);
        break;
    }
  };

  const toggleAvailHandler = (status, idmatch, tutorid) => {
    const notavailtutor = props.adminInfo.notavailtutor;
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
      <section className={classes.wrapper}>
        {props.cases
          ? _DATA
              .currentData()
              .map((oneCase) => (
                <CaseItem
                  key={oneCase.tutorid}
                  id={oneCase.tutorid}
                  cases={oneCase}
                  type={props.type}
                  idmatch={props.idmatch}
                  admin={props.admin ? props.admin : ""}
                  adminInfo={props.adminInfo ? props.adminInfo : {}}
                  toggleStatus={
                    props.toggleStatusHandler ? props.toggleStatusHandler : ""
                  }
                  toggleVerify={
                    props.toggleVerifyHandler ? props.toggleVerifyHandler : ""
                  }
                  toggleFavourite={props.toggleFavouriteHandler}
                  toggleAvail={toggleAvailHandler}
                  toggleCheck={UpdateCheckHandler}
                  isFavouriteTutor={
                    props.adminInfo
                      ? props.adminInfo.favouritetutorid.includes(
                          oneCase.tutorid
                        )
                      : ""
                  }
                  notAvailStatus={
                    props.adminInfo
                      ? props.adminInfo.notavailtutor.includes(oneCase.tutorid)
                      : false
                  }
                  checkedStatus={
                    props.adminInfo
                      ? props.adminInfo.checked != null &&
                        props.adminInfo.checked != ""
                        ? props.adminInfo.checked.includes(oneCase.tutorid)
                        : false
                      : false
                  }
                  checkingStatus={
                    props.adminInfo
                      ? props.adminInfo.checking != null &&
                        props.adminInfo.checking != ""
                        ? props.adminInfo.checking.includes(oneCase.tutorid)
                        : false
                      : false
                  }
                  isFavourite={
                    props.favourite
                      ? props.favourite.includes(oneCase.tutorid)
                      : ""
                  }
                />
              ))
          : []}
        <div className={classes.pagination}>
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="primary"
          />
        </div>
      </section>
    </>
  );
};

export default CasesList;
