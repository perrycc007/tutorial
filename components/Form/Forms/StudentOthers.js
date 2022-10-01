import React, {useState} from 'react';
import Input from '../../InputTool/Input'
// import MinSlider from '../../InputTool/Slider';
import Select from '../../InputTool/Selects';
import formField from '../FormModel/formField'
import { Formik, Form, useField } from 'formik';







export default function StudentOthers() {
    const inputfield = formField.inputfield.StudentOthers;
    const selectfield = formField.selectfield.StudentOthers;
    const [hour,setHour] = useState([])
    const [freq,setFreq] = useState([])
    const [price,setPrice] = useState([])
    const hourHandlder = (value) => {
            setHour(value)
            console.log(value)
    }

    const FreqHandlder = (value) => {
        setFreq(value)
    }

    const PriceHandler = (value) => {
        setPrice(value)
    }
  return (
    <React.Fragment>
      <Formik
      initialValues={{
        Name: '',
        PhoneNo: '',
        Address: '',
        Nationality: '',
        Language: '',
        EmergencyContact: '',
        EmergencyRelationship: '',
        EmergencyPhone: '',
        agreeWith: '' 
              }}
        onSubmit={(values) => {
          setTimeout(() => {
            console.log(values)
          }, 400);
        }}>
      <Form>

      {Object.entries(inputfield).map(([key, value])=>
      <Input name={value.name} label={value.label}  />)}

      {Object.entries(selectfield).map(
        ([key, value])=> <Select
            id={value.name}
            name={value.name}
            label={value.label}
          >
          {
          [value.option].map(
            (options) => 
               options.map(
                (opt)=>
          <option key={opt.value} value={opt.value} label={opt.label}
              // selected={place.value === place ? 'selected' : ''}
            />))}
          </Select>)}
          <p>每堂總時數(分鐘)</p>
          {/* <MinSlider  step ={15} max={180} min={30} dmax={180} dmin={30} minD={15} passValue={hourHandlder}/> */}
          <p>一週堂數</p>
          {/* <MinSlider  step ={1} max={7} min={1} dmax={3} dmin={1} minD={1} passValue={FreqHandlder}/> */}
          <p>學費每小時</p>
          {/* <MinSlider  step ={20} max={1000} min={60} dmax={100} dmin={200}  minD={20} passValue={PriceHandler}/> */}

      </Form>
      
      </Formik>
    </React.Fragment>
  );
}
