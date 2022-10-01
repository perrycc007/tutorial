import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BasicSelect(props) {
  const [choice, setChoice] = React.useState();
  let defaulted = 'None';
  props.prevSelect && props.prevSelect.map((option)=> {if(option.id == props.id){defaulted=option.value}})
  React.useEffect(()=>{
    setChoice(defaulted)
    console.log(choice)
  },[defaulted])

  const handleChange = (event) => {
    setChoice(event.target.value);
    props.passValue(props.id,event.target.value)
  };
 
  
  // props.prevSelect.some((option)=>console.log(option.id))
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choice}
          label={props.name}
          onChange={handleChange}
          defaultValue={defaulted}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.select.map((select)=><MenuItem value={select.value} key={props.id +`${select.value}` }>{select.label}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
