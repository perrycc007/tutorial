import React, { useState, useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import formField from "../FormModel/formField";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./Form.module.css";
import FormControl from "@mui/material/FormControl";
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
      <h1>資歷</h1>
      <form onSubmit={formHandler} className={classes.formContent}>
        {Object.entries(inputfield).map(([key, value]) => (
          <div key={`div${value.label}`} className={classes.inputContainer}>
            <TextField
              className={classes.formInput}
              name={value.name}
              label={value.label}
              key={value.name}
              value={userData[value.name]}
              defaultValue={info ? info[value.name] : ""}
              onChange={updateUserDataHandler(value.name)}
            />
          </div>
        ))}
        {Object.entries(selectfield).map(([key, value]) => (
          <div key={`div${value.label}`} className={classes.selectContainer}>
            <FormControl className={classes.formSelect} key={value.name}>
              <InputLabel id="demo-simple-select-label">
                {value.label}
              </InputLabel>
              <Select
                id={value.name}
                key={value.name}
                name={value.name}
                label={value.name}
                onChange={updateUserDataHandler(value.name)}
                defaultValue={info ? info[value.name] : ""}
              >
                {[value.option].map((options) =>
                  options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </div>
        ))}
        <div className={classes.buttonContainer}>
          <Button className={classes.Button} variant="outlined" type="submit">
            儲存
          </Button>
          <Button className={classes.Button} variant="outlined" type="submit">
            儲存並下一步
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EducationForm;
