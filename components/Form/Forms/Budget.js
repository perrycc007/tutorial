import React from 'react';
import { useState, useCallback } from 'react';
import MinSlider from '../../InputTool/Slider';
import Typography from '@mui/material/Typography';


const Budget = (props) =>{
// const [fee,setFee] = useState([])
const info = props.info
const [userData, setUserData] = useState(info|initialUserData);

const initialUserData = {
    lowestfee: 60,
    highestfee: 1000,
  };

// const FeeHandler = (value) => {
//     setFee(value)
// }
const updateUserDataHandler = (value) => {
        value[0] == null? value[0] = 60 : value[0]
        value[1] == null? value[1] = 1000 : value[1]
        console.log(value)
        setUserData({ ...userData, lowestfee: value[0], highestfee: value[1]  });
        console.log(userData)
    }




const formHandler = (event) => {
    event.preventDefault()
    console.log(userData)
    props.submitHandler(userData)
  };

    return(
        <React.Fragment>
            <form>
                <Typography component={'span'} variant={'body2'} sx={{ width: '33%', flexShrink: 0 }}>
                補習學費每小時
                </Typography>
            <MinSlider  step ={20} max={1000} min={60} dmax={info?info['highestfee']:100} dmin={info?info['lowestfee']:200}  minD={20} passValue={updateUserDataHandler}/>

                <button onClick={formHandler}>Save</button>
                </form>
        </React.Fragment>
    )
}

export default Budget;