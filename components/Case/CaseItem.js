import classes from "./CaseItem.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditForm from "../Form/Forms/EditForm";
import { useState, useEffect } from "react";
import BasicPopover from "../ui/BasicPopover";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import itemName from "./itemName";

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
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorid : props.cases.studentid,
        "close",
        props.type
      );
    } else {
      setStatus("open");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorid : props.cases.studentid,
        "open",
        props.type
      );
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
  // const item = Object.entries(items).map((key, value) => {
  //   return key;
  // });

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

  // const heading = item.slice(0, 5);
  // const sumamry = item.slice(6, 10);

  let { location, subject, availtime, ...items } = props.cases;

  const fee = (items.highestfee + items.lowestfee) / 2;

  const readDate = (notFormat) => {
    const time = notFormat.split("t");
    let dayOfWeek = [];
    let startingTime = `${time[1]}:00`;
    switch (time[0]) {
      case "d1":
        dayOfWeek = "?????????";
        break;
      case "d2":
        dayOfWeek = "?????????";
        break;
      case "d3":
        dayOfWeek = "?????????";
        break;
      case "d4":
        dayOfWeek = "?????????";
        break;
      case "d5":
        dayOfWeek = "?????????";
        break;
      case "d6":
        dayOfWeek = "?????????";
        break;
      case "d7":
        dayOfWeek = "?????????";
        break;

      default:
      // code block
    }

    const result = [dayOfWeek, startingTime];
    return result;
  };

  const availtimeArray = JSON.parse(availtime);
  const timeForDisaply = availtimeArray
    ? availtimeArray.map((item) => {
        return readDate(item);
      })
    : [];

  let heading = {
    location: JSON.parse(location),
    subject: JSON.parse(subject),
    fee: fee,
  };

  return (
    <div className={classes.item}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {Object.entries(heading).map(([key, value]) => (
            <p>
              {itemName[key]}:
              {typeof value == "object"
                ? value.map((item) => {
                    return ` ${item}`;
                  })
                : `$${value}/??????`}
            </p>
          ))}

          <div className={classes.heading}></div>
        </AccordionSummary>
        <AccordionDetails className={classes.summary}>
          {Object.entries(items).map(
            ([key, value]) =>
              itemName[key] !== undefined &&
              value !== null &&
              key !== "subgrade" && (
                <p>
                  {itemName[key]}: {value}
                </p>
              )
          )}
          {props.type == "tutor"
            ? JSON.parse(items.subgrade).map((item) => (
                <p>
                  {item.id} : {item.value}
                </p>
              ))
            : ""}
          {props.type != "edit" &&
            props.admin != "admin" &&
            props.admin != "adminTutor" && (
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
            )}

          {props.type == "edit" ||
          props.admin == "admin" ||
          props.admin == "adminTutor" ? (
            <div className={classes.summary}>
              <p>{timeForDisaply}</p>
              <Button variant="outlined" onClick={StatusHandler}>
                {status == "open" ? "??????????????????" : "??????????????????"}
              </Button>
              <BasicPopover userid={props.cases.userid} type={props.type} />
              <div>
                <EditForm cases={props.cases} />
              </div>
            </div>
          ) : (
            ""
          )}
          {props.admin == "adminTutor" && (
            <div className={classes.heading}>
              <Button onClick={toggleCheck}>{checkStatus}</Button>
              <Button onClick={toggleNotAvail}>
                {notAvailStatus ? "Not Available" : "Available"}
              </Button>
              {props.isFavouriteTutor ? <FavoriteIcon /> : ""}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CaseItem;
