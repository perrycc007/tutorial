import React, { useState, useCallback, useEffect } from "react";
import formField from "../FormModel/formField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import classes from "./Form.module.css";


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

  useEffect(() => {
    setUserData(info| initialUserData);
  }, [info]);

  return (
    <div>
      <h1>個人資料</h1>
      <form onSubmit={formHandler} className={classes.formContent}>
        {Object.entries(inputfield).map(([key, value]) => (
          <div className={classes.formInput}>
            <p key={`input${value.label}`}>{value.label}</p>
            <input
              className={classes.formInput}
              name={value.name}
              key={value.name}
              value={userData[value.name]}
              defaultValue={info ? info[value.name] : ""}
              onChange={updateUserDataHandler(value.name)}
            />
          </div>
        ))}

        {Object.entries(selectfield).map(([key, value]) => (
          <FormControl className={classes.formSelect} key={value.name}>
            <div>
              <p key={`input${value.label}`}>{value.label}</p>
              <select
                id={value.name}
                key={value.name}
                name={value.name}
                onChange={updateUserDataHandler(value.name)}
                defaultValue={info ? info[value.name] : ""}
              >
                {[value.option].map((options) =>
                  options.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                    >
                      {opt.label}
                    </option>
                  ))
                )}
              </select>
            </div>
          </FormControl>
        ))}

        {!info && (
          <FormControlLabel
            control={<Checkbox name={checkboxfield.name} />}
            label={checkboxfield.label}
          />
        )}
        <div className={classes.buttonContainer}>
          <Button variant="outlined" type="submit">
            儲存
          </Button>
          <Button variant="outlined" type="submit">
            儲存並下一步
          </Button>
        </div>
      </form>
    </div>
  );
}
