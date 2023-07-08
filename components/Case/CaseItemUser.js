import classes from "./CaseItem.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import itemName from "./itemName";
function CaseItemUser(props) {
  const toggleFavoriteStatusHandler = () => {
    props.toggleFavourite(props.id);
  };

  // const item = Object.entries(items).map((key, value) => {
  //   return key;
  // });

  let { location, subject, availtime, studentid, ...items } = props.cases;
  const fee = (items.highestfee + items.lowestfee) / 2;

  let heading = {
    location: JSON.parse(location),
    subject: JSON.parse(subject),
  };
  let verifyServer = "否";
  if (props.type == "tutor") {
    verifyServer = items.verify;
  }
  return (
    <div className={classes.item}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {Object.entries(heading).map(([key, value]) => (
            <p className={classes.title} key={`${itemName[key]}value`}>
              {typeof value == "object"
                ? value.map((item) => {
                    return ` ${item}`;
                  })
                : ""}
            </p>
          ))}
          <p className={classes.title}>{`$${fee}/小時`}</p>
        </AccordionSummary>
        <AccordionDetails className={classes.summary}>
          {props.type == "tutor" && <p>履歷驗證狀態:{verifyServer}</p>}
          <p className={classes.detail}>
            ID:{" "}
            {props.type == "tutor"
              ? props.cases.tutorid
              : props.cases.studentid}
          </p>
          {Object.entries(items).map(
            ([key, value]) =>
              itemName[key] !== undefined &&
              value !== null &&
              key !== "subgrade" && (
                <p className={classes.detail} key={itemName[key]}>
                  {itemName[key]}: {value}
                </p>
              )
          )}
          {props.type == "tutor"
            ? JSON.parse(items.subgrade).map((item) => (
                <p className={classes.detail} key={item.id}>
                  {item.id} : {item.value}
                </p>
              ))
            : ""}

          <Button
            color="error"
            onClick={
              props.type == "tutor"
                ? toggleFavoriteStatusHandler
                : toggleFavoriteStatusHandler
            }
          >
            {props.isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CaseItemUser;
