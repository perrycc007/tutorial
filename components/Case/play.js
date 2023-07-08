import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import classes from "./CaseItem.module.css";
import itemName from "./itemName";

function CaseItem(props) {
  const toggleFavoriteStatusHandler = () => {
    props.toggleFavourite(props.id);
  };

  const { location, subject, availtime, studentid, ...items } = props.cases;
  const { highestfee, lowestfee, verify } = items;
  const fee = (highestfee + lowestfee) / 2;

  const heading = {
    location: JSON.parse(location),
    subject: JSON.parse(subject),
  };

  let verifyServer = "否";
  if (props.type === "tutor") {
    verifyServer = verify;
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
              {typeof value === "object" ? value.map(item => ` ${item}`) : ""}
            </p>
          ))}
          <p className={classes.title}>{`$${fee}/小時`}</p>
        </AccordionSummary>
        <AccordionDetails className={classes.summary}>
          {props.type === "tutor" && <p>履歷驗證狀態:{verifyServer}</p>}
          <p className={classes.detail}>
            ID: {props.type === "tutor" ? props.cases.tutorid : studentid}
          </p>
          {Object.entries(items).map(([key, value]) => {
            if (
              itemName[key] !== undefined &&
              value !== null &&
              key !== "subgrade"
            ) {
              return (
                <p className={classes.detail} key={itemName[key]}>
                  {itemName[key]}: {value}
                </p>
              );
            }
            return null;
          })}
          {props.type === "tutor" &&
            JSON.parse(items.subgrade).map(item => (
              <p className={classes.detail} key={item.id}>
                {item.id}: {item.value}
              </p>
            ))}

          <Button
            color="error"
            onClick={toggleFavoriteStatusHandler}
          >
            {props.isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CaseItem;
