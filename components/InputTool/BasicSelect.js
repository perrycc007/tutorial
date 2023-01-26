import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export default function BasicSelect(props) {
  const [choice, setChoice] = React.useState();
  let defaulted = "None";
  props.prevSelect &&
    props.prevSelect.map((option) => {
      if (option.id == props.id) {
        defaulted = option.value;
      }
    });
  React.useEffect(() => {
    setChoice(defaulted);
    console.log(choice);
  }, [defaulted]);

  const handleChange = (event) => {
    setChoice(event.target.value);
    props.passValue(props.id, event.target.value);
  };

  // props.prevSelect.some((option)=>console.log(option.id))
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <p id="demo-simple-select-label">{props.name}</p>
        <select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choice}
          label={props.name}
          onChange={handleChange}
          defaultValue={defaulted}
        >
          {props.select.map((select) => (
            <option value={select.value} key={props.id + `${select.value}`}>
              {select.label}
            </option>
          ))}
        </select>
      </FormControl>
    </Box>
  );
}
