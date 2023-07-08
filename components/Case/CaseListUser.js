import { useEffect, useState } from "react";
import CaseItem from "./CaseItem";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Layout/usePagination";
import classes from "./CaseList.module.css";

// And now we can use these
const CaseListUser = (props) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 15;
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

  return (
    <>
      <section className={classes.wrapper}>
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

export default CaseListUser;
