import {useState,useEffect} from 'react'
import classes from './ToggleButton.module.css'
const ToggleButton = (props) => {
     const [clicked,setClicked] = useState(false)
     const toggle =()=>{
        setClicked(prevState => !prevState)
        props.Click(props.id)
     }

const contentClassname =  clicked ? classes.toggleButtonClose : classes.toggleButton;

useEffect(()=>{
    setClicked(props.value)
},[props.value])


return(
            <button id={props.id} onClick={toggle} className={contentClassname}>{props.id}</button>
)
}
export default ToggleButton;