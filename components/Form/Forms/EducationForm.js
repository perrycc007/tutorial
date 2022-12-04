import React, { useState, useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import Input from "../../InputTool/Input";
import formField from "../FormModel/formField";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./EducationForm.module.css";

const EducationForm = (props) => {
  const inputfield = formField.inputfield.Education;
  const selectfield = formField.selectfield.Education;
  const initialUserData = {
    Occupation: "",
    YearOfExperience: "",
    Experience: "",
    HighestTeachingLevel: "",
    Notes: "",
    EducatoionLevel: "",
    SecondarySchool: "",
    PrimarySchool: "",
    SchoolCat: "",
    PublicExamGrade: "",
    University: "",
    Major: "",
    OtherCert: "",
    Year: "",
    language: "",
    strength: "",
    intro: "",
  };
  const info = props.info;
  const [userData, setUserData] = useState(info | initialUserData);
  const updateUserDataHandler = useCallback(
    (type) => (event) => {
      setUserData({ ...userData, [type]: event.target.value });
      console.log(userData);
    },
    [userData]
  );
  const formHandler = (event) => {
    event.preventDefault();
    console.log(userData);
    props.submitHandler(userData);
  };

  return (
    <React.Fragment>
      <form onSubmit={formHandler}>
        {Object.entries(inputfield).map(([key, value]) => (
          <TextField
            name={value.name}
            key={value.name}
            label={value.label}
            value={userData[value.name]}
            defaultValue={info ? info[value.name] : ""}
            onChange={updateUserDataHandler(value.name)}
          />
        ))}
        <div className={classes.flexContainer}>
          {Object.entries(selectfield).map(([key, value]) => (
            <div className="flexContainer">
              <div className="flexContainer">{value.label}</div>
              <Select
                id={value.name}
                key={value.name}
                name={value.name}
                label={value.label}
                onChange={updateUserDataHandler(value.name)}
                defaultValue={info ? info[value.name] : ""}
              >
                {[value.option].map((options) =>
                  options.map((opt) => (
                    <MenuItem
                      key={opt.value}
                      value={opt.value}
                      // selected={place.value === place ? 'selected' : ''}
                    >
                      {opt.label}
                    </MenuItem>
                  ))
                )}
              </Select>
            </div>
          ))}
        </div>
        <Button variant="contained">上載大學證明</Button>
        <Button variant="outlined" type="submit">
          儲存
        </Button>
        <Button variant="outlined" type="submit">
          儲存並下一步
        </Button>
      </form>
    </React.Fragment>
  );
};

export default EducationForm;
