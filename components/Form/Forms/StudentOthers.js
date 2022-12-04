import React, {useState,useCallback } from 'react';

import MinSlider from '../../InputTool/Slider';
import Select from '@mui/material/Select';
import formField from '../FormModel/formField'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';



export default function StudentOthers(props) {
    const inputfield = formField.inputfield.StudentOthers;
    const selectfield = formField.selectfield.StudentOthers;
    const initialUserData = {

    };
    
    const info = props.info??initialUserData
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

    const hourHandlder = (value) => {
        value[0] == null? value[0] = 60 : value[0]
        value[1] == null? value[1] = 180 : value[1]
        setUserData({ ...userData, lowestduration: value[0], highestduration:value[1] });
        console.log(value[0])
    }

    const FreqHandlder = (value) => {
      value[0] == null? value[0] = 1 : value[0]
      value[1] == null? value[1] = 7 : value[1]
      setUserData({ ...userData, lowestfrequency: value[0], highestfrequency:value[1] });
    }

    const PriceHandler = (value) => {
      value[0] == null? value[0] = 60 : value[0]
      value[1] == null? value[1] = 1000 : value[1]
      setUserData({ ...userData, lowestfee: value[0], highestfee:value[1] });
    }
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
          <p>每堂總時數(分鐘)</p>
          <MinSlider  step ={15} max={180} min={30} dmax={info['highestduration']!= null?info['highestduration']:100} dmin={info['lowestduration']!= null?info['lowestduration']:200}  minD={15} passValue={hourHandlder}/>
          <p>一週堂數</p>
          <MinSlider  step ={1} max={7} min={1} dmax={info['highestfrequency']!= null?info['highestfrequency']:1} dmin={info['lowestfrequency']!= null?info['lowestfrequency']:7}  minD={1} passValue={FreqHandlder}/>
          <p>學費每小時</p>
            <MinSlider  step ={20} max={1000} min={60} dmax={info['highestfee']!= null?info['highestfee']:100} dmin={info['lowestfee']!= null?info['lowestfee']:200}  minD={20} passValue={PriceHandler}/>
          <Button variant="outlined" type="submit">儲存</Button>
          <Button variant="outlined" type="submit">儲存並下一步</Button>
      </form>
    </React.Fragment>
  );
}
