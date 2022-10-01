import React from 'react';
import { Grid, MenuItem, Typography } from '@mui/material';
import Input from '../../InputTool/Input'
import Checkbox from '../../InputTool/Checkboxes'
import Select from '../../InputTool/Selects';
import formField from '../FormModel/formField'
import { Formik, Form, useField } from 'formik';







export default function TutorOthers() {
  const inputfield = formField.inputfield.TutorOthers;
  const selectfield = formField.selectfield.TutorOthers;


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
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem> 
              // selected={place.value === place ? 'selected' : ''}
            ))}
          </Select>)}
      </Form>
      </Formik>
    </React.Fragment>
  );
}
