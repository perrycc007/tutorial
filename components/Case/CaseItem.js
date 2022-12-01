import Card from "../Layout/Card";
import classes from "./CaseItem.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditForm from "../Form/Forms/EditForm";
import { useState, useEffect } from "react";

function CaseItem(props) {
  const [status, setStatus] = useState(props.cases.status);
  const [notAvailStatus, setNotAvailStatus] = useState(false);
  const [checkStatus, setCheckStatus] = useState("not yet checked");
  const toggleFavoriteStatusHandler = () => {
    props.toggleFavourite(props.id);
  };
  const toggleCheck = () => {
    if (checkStatus == "not yet checked") {
      setCheckStatus("checking");
      props.toggleCheck(props.idmatch, props.cases.tutorid, "not yet checked");
    } else if (checkStatus == "checking") {
      setCheckStatus("checked");
      props.toggleCheck(props.idmatch, props.cases.tutorid, "checking");
    } else {
      setCheckStatus("not yet checked");
      props.toggleCheck(props.idmatch, props.cases.tutorid, "checked");
    }
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
  const toggleNotAvail = () => {
    if (notAvailStatus) {
      setNotAvailStatus(false);
      props.toggleAvail(false, props.idmatch, props.cases.tutorid);
    } else {
      setNotAvailStatus(true);
      props.toggleAvail(true, props.idmatch, props.cases.tutorid);
    }
  };
  const items = props.cases;
  const item = Object.entries(items).map((key, value) => {
    return key;
  });

  useEffect(() => {
    if (props.checkedStatus) {
      setCheckStatus("checking");
    } else if (props.checkingStatus) {
      setCheckStatus("checked");
    } else {
      setCheckStatus("not yet checked");
    }
    setNotAvailStatus(props.notAvailStatus);
  }, []);

  const heading = item.slice(0, 5);
  const sumamry = item.slice(6, 10);

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
          {props.type == "cases" && props.admin != "admin" && (
            <button onClick={toggleFavoriteStatusHandler}>
              {props.isFavourite ? "Remove from Favorites" : "To Favorites"}
            </button>
          )}
          {props.type == "edit" ||
          props.admin == "admin" ||
          props.admin == "adminTutor" ? (
            <div>
              <button onClick={StatusHandler}>
                {status == "open" ? "Open" : "Close"}
              </button>
              <div>
                <EditForm cases={props.cases} />
              </div>
            </div>
          ) : (
            ""
          )}
          {props.admin == "adminTutor" && (
            <div>
              <button onClick={toggleCheck}>{checkStatus}</button>
              <button onClick={toggleNotAvail}>
                {notAvailStatus ? "Not Available" : "Available"}
              </button>
              <p>{props.isFavouriteTutor ? "Is Favourite" : ""}</p>
              <button>Profile</button>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CaseItem;
