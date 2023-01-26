import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TimetableButton from "../../inputTool/TimetableButton";
import classes from "./TimeForm.module.css";

// const time = [{8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false}];
const days = [
  { 1: true, 2: false, 3: false, 4: true, 5: false, 6: false, 7: false },
];

const times = [];
const weekday = ["週一", "週二", "週三", "週四", "週五", "週六", "週日"];

const timeValue = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

[...Array(15)].map(() => {
  return times.push(days);
});

export default function TimeForm(props) {
  const [selected, setSelected] = useState([]);
  // const getUserid = userStore(state => state.userId);
  useEffect(() => {
    props.info && props.info.hasOwnProperty("availtime") == true
      ? console.log(JSON.parse(props.info.availtime))
      : "";
    props.info && props.info.hasOwnProperty("availtime") == true
      ? setSelected(JSON.parse(props.info.availtime) ?? [])
      : "";
  }, [props.info]);

  const checkboxHandler = (time) => {
    console.log(time);
    const existed = (time) => {
      return selected.findIndex((item) => item === time);
    };
    // updating
    if (existed(time) > -1) {
      const list = selected.filter((item) => item !== time);
      console.log(list);
      setSelected(list);
    } else {
      // adding
      const newlist = [...selected, time];
      setSelected(newlist);
      console.log(newlist);
    }
  };

  // submit
  const submitHandler = (event) => {
    event.preventDefault();
    props.submitHandler(selected, "availtime");
  };

  function inTheList(id) {
    const checked = selected ? selected.some((time) => time === id) : false;
    return checked;
  }

  useCallback(() => {
    console.log("rerendered");
  }, [checkboxHandler]);
  return (
    <div>
      <h2>期望時間</h2>
      <form onSubmit={submitHandler}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <p className={classes.time} style={{ color: "white" }}>
              b
            </p>
            {timeValue.map((item) => (
              <p key={item} className={classes.time}>{item}</p>
            ))}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "auto",
              }}
            >
              {weekday.map((item) => (
                <p key={item} className={classes.day}>{item}</p>
              ))}
            </div>
            {times.map((x, xi) => {
              return x.map((y, yi) => {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      margin: "auto",
                      borderBottom: "0.5px solid #818181",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {Object.entries(y).map(([key, value]) => {
                        return (
                          <>
                            <TimetableButton
                              value={inTheList(
                                "d" +
                                  parseInt(`${key}`) +
                                  "t" +
                                  parseInt(`${xi}`)
                              )}
                              id={
                                "d" +
                                parseInt(`${key}`) +
                                "t" +
                                parseInt(`${xi}`)
                              }
                              key={
                                "d" +
                                parseInt(`${key}`) +
                                "t" +
                                parseInt(`${xi}`)
                              }
                              Click={checkboxHandler}
                            />
                          </>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>

        <Button variant="outlined" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}
