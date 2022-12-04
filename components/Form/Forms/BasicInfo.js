import React, {useState,useCallback, useEffect} from 'react';
import formField from '../FormModel/formField'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';


let defaulted = '';
export default function BasicInfo(props) {
  const inputfield = formField.inputfield.BasicInfo;
  const checkboxfield = formField.checkboxfieldfield.agreewith;
  const selectfield = formField.selectfield.BasicInfo;
  const initialUserData = {
    name: '',
    phoneno: '',
    address: '',
    nationality: '',
    language: '',
    emergencycontact: '',
    emergencyrelationship: '',
    emergencyphone: '',
    agreewith: '' 
  };
  
  const info = props.info
  const [userData, setUserData] = useState(info|initialUserData);

  const updateUserDataHandler = useCallback(
    (type) => (event) => {
      setUserData({ ...userData, [type]: event.target.value });
      console.log(userData)
    },
    [userData]
  );
  const formHandler = (event) => {
    event.preventDefault()
    console.log(userData)
    props.submitHandler(userData)
  };

  useEffect(()=>{console.log(info)},[])

  return (
    <React.Fragment>

    <form onSubmit={formHandler}>
      {Object.entries(inputfield).map(([key, value])=>
      <TextField  
      name={value.name} 
      key={value.name}
      label={value.label} 
      value={userData[value.name]}
      defaultValue={info?info[value.name]:''}
      onChange={updateUserDataHandler(value.name)}/>
      )}
        
      {Object.entries(selectfield).map(
        ([key, value])=> 
        <FormControl key={value.name}>
          <Select
            id={value.name}
            key={value.name}
            name={value.name}
            label={value.label}
            onChange={updateUserDataHandler(value.name)}
            defaultValue={info?info[value.name]:''}
          >
          {[value.option].map(
            (options) => 
               options.map(
                (opt)=> 
          
          <MenuItem key={opt.value} value={opt.value}
              // selected={place.value === place ? 'selected' : ''}
            >{opt.label}</MenuItem>))}
          </Select>
          </FormControl>)}
          
          {!info && <FormControlLabel control={<Checkbox name={checkboxfield.name} />} label={checkboxfield.label} />}
          <Button variant="outlined" type="submit">儲存</Button>
          <Button variant="outlined" type="submit">儲存並下一步</Button>
      </form>
    </React.Fragment>
  );
}
