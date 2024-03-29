import React from "react";
import { useState } from "react";
import AccordionFilter from "./AccordionFilter";
import MinSlider from "../inputTool/Slider";
import Typography from "@mui/material/Typography";
import place from "../Form/Forms/Location";
import subjects from "../Form/Forms/Subject";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import classes from "./Filter.module.css";

const Filter = (props) => {
  const [price, setPrice] = useState([]);
  const [grade, setGrade] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const PriceHandler = (value) => {
    setPrice(value);
  };

  const placeHandlerHandler = (list) => {
    setPlaceList(list);
  };
  const subjectHandlerHandler = (list) => {
    setSubjectList(list);
  };

  const GradeHandleChange = (e) => {
    setGrade(e.target.value);
  };
  const filterHandler = (e) => {
    e.preventDefault();
    console.log(price, placeList, grade, subjectList);
    onAddForm(price, placeList, grade, subjectList);
  };

  async function onAddForm(price, placeList, grade, subjectList) {
    const preference = {
      fee: price,
      location: placeList,
      highestteachinglevel: grade,
      subject: subjectList,
    };
    for (const key in preference) {
      if (preference[key] === "") {
        delete preference[key];
      }
    }
    console.log(preference);
    props.FilterHanlder(preference);
  }

  return (
    <React.Fragment>
      <form className={classes.form}>
        <div className={classes.sliderContainer}>
          <p>學費每小時</p>
          <MinSlider
            step={20}
            max={1000}
            min={60}
            dmax={200}
            dmin={100}
            minD={20}
            passValue={PriceHandler}
          />
        </div>
        <AccordionFilter
          listHandlerHandler={placeHandlerHandler}
          option={place}
          passValue={placeList}
          buttonName="地點"
        />
        <AccordionFilter
          listHandlerHandler={subjectHandlerHandler}
          option={subjects}
          passValue={subjectList}
          buttonName="科目"
        />

        <Button className={classes.button} variant="contained" onClick={filterHandler}>
          篩選
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Filter;
