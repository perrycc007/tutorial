import React, { useState, useCallback, useEffect } from "react";
import formField from "../FormModel/formField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import classes from "./Form.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function BasicInfo(props) {
  const inputfield = formField.inputfield.BasicInfo;
  const checkboxfield = formField.checkboxfieldfield.agreewith;
  const selectfield = formField.selectfield.BasicInfo;
  const initialUserData = {
    name: "",
    phoneno: "",
    address: "",
    nationality: "",
    language: "",
    emergencycontact: "",
    emergencyrelationship: "",
    emergencyphone: "",
    agreewith: "",
  };

  const info = props.info;
  const [userData, setUserData] = useState(initialUserData);
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

  useEffect(() => {
    setUserData(info | initialUserData);
  }, [info]);

  return (
    <div>
      <h1>個人資料</h1>
      <form onSubmit={formHandler} className={classes.formContent}>
        {Object.entries(inputfield).map(([key, value]) => (
          <div key={`div${value.label}`} className={classes.inputContainer}>
            <TextField
            className={classes.formInput}
              name={value.name}
              label={value.label}
              key={value.name}
              // value={userData[value.name]}
              defaultValue={info ? info[value.name] : ""}
              onChange={updateUserDataHandler(value.name)}
            />
          </div>
        ))}

        {Object.entries(selectfield).map(([key, value]) => (
          <div key={`div${value.label}`} className={classes.selectContainer}>
          <FormControl className={classes.formSelect} key={value.name}>
            <InputLabel id="demo-simple-select-label">{value.label}</InputLabel>
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

        {!info && (
          <FormControlLabel
            control={<Checkbox name={checkboxfield.name} />}
            label={checkboxfield.label}
          />
        )}
        <div className={classes.buttonContainer}>
          <Button className={classes.Button} variant="outlined" type="submit">
            儲存
          </Button>
        </div>
      </form>
    </div>
  );
}
