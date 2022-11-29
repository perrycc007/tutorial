import Card from "../Layout/Card";
import classes from "./CaseItem.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditForm from "../Form/Forms/EditForm";
import { useState } from "react";

function CaseItem(props) {
  console.log(props.cases);
  const [status, setStatus] = useState(props.cases.status);

  const toggleFavoriteStatusHandler = () => {
    props.toggleFavourite(props.id);
  };

  const StatusHandler = () => {
    if (status == "open") {
      setStatus("close");
      props.toggleStatus(props.id, "close");
    } else {
      setStatus("open");
      props.toggleStatus(props.id, "open");
    }
  };

  const items = props.cases;
  const item = Object.entries(items).map((key, value) => {
    return key;
  });
  // console.log(items)
  const heading = item.slice(0, 5);
  const sumamry = item.slice(6, 10);
  // heading.map((item)=>{console.log(item[1])})
  // console.log(heading)
  return (
    <div className={classes.item}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.heading}>
            {/* <p>{heading}</p> */}
            {heading.map((item) => (
              <p>{item[1]}</p>
            ))}
            {/* <p>{props}</p> */}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {sumamry.map((item) => (
              <p>{item[1]}</p>
            ))}
          </Typography>
          {props.type == "tutor" && props.admin != "admin" && (
            <button onClick={toggleFavoriteStatusHandler}>
              {props.isFavourite ? "Remove from Favorites" : "To Favorites"}
            </button>
          )}
          {props.type == "cases" && (
            <button onClick={toggleFavoriteStatusHandler}>
              {props.isFavourite ? "Remove from Favorites" : "To Favorites"}
            </button>
          )}
          {(props.type == "edit") | (props.admin == "admin") && (
            <div>
              <button onClick={StatusHandler}>
                {status == "open" ? "Open" : "Close"}
              </button>
              <div>
                <EditForm cases={props.cases} />
              </div>
            </div>
          )}
          {props.admin == "admin" && (
            <div>
              <button>Check</button>
              <button>Available</button>
              <p>is Favourite</p>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CaseItem;
