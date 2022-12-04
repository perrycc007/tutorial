import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import BasicTabs from "../../ui/BasicTabs";
import place from "./Location";
import Button from "@mui/material/Button";

const LocationForm = (props) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    props.info && props.info.hasOwnProperty("location") == true
      ? console.log(JSON.parse(props.info.location))
      : "";
    props.info && props.info.hasOwnProperty("location") == true
      ? setList(JSON.parse(props.info.location))
      : "";
    console.log(list);
  }, [props.info]);

  const listHandlerHandler = (value) => {
    setList(value);
    console.log(list);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(list);
    props.submitHandler(list, "location");
  };
  return (
    <React.Fragment>
      <h2>教授地點</h2>
      <form onSubmit={submitHandler}>
        <BasicTabs
          category={place}
          listHandler={listHandlerHandler}
          passValue={list}
        />
        <Button variant="outlined" type="submit">
          {props.isTutor ? "儲存並下一步" : "儲存並開始申請"}
        </Button>
      </form>
    </React.Fragment>
  );
};
export default LocationForm;
