import React, {useState,useCallback } from 'react';

import MinSlider from '../../InputTool/Slider';
import Select from '@mui/material/Select';
import formField from '../FormModel/formField'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';




export default function StudentOthers(props) {
    const inputfield = formField.inputfield.StudentOthers;
    const selectfield = formField.selectfield.StudentOthers;
    const initialUserData = {

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
    const [lowestduration,setLowestHour] = useState([])
    const [lowestfreq,setLowestFreq] = useState([])
    const [lowestprice,setLowestPrice] = useState([])
    const [highestduration,setHighestHour] = useState([])
    const [highestfreq,setHighestFreq] = useState([])
    const [highestprice,setHighestPrice] = useState([])
    const hourHandlder = (value) => {
            setLowestHour(value[0])
            setHighestHour(value[1])
            setUserData({ ...userData, lowestduration: value[0], highestduration:value[1] });
            console.log(value[0])
    }

    const FreqHandlder = (value) => {
      setLowestFreq(value[0])
      setHighestFreq(value[1])
      setUserData({ ...userData, lowestfrequency: value[0], highestfrequency:value[1] });
    }

    const PriceHandler = (value) => {
      setLowestPrice(value[0])
      setHighestPrice(value[1])
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
          <MinSlider  step ={15} max={180} min={30} dmax={100} dmin={200}  minD={15} passValue={hourHandlder}/>
          <p>一週堂數</p>
          <MinSlider  step ={1} max={7} min={1} dmax={1} dmin={7}  minD={1} passValue={FreqHandlder}/>
          <p>學費每小時</p>
            <MinSlider  step ={20} max={1000} min={60} dmax={100} dmin={200}  minD={20} passValue={PriceHandler}/>
          <button type="submit">儲存</button>
          <button type="submit">儲存並下一步</button>
      </form>
    </React.Fragment>
  );
}
