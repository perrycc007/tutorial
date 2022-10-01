import React from 'react';
import { Grid, Typography } from '@mui/material';
import Input from '../../InputTool/Input'
import Checkbox from '../../InputTool/Checkbox'
import Select from '../../InputTool/Select';
import { Formik, Field, Form } from 'formik';

const Findus = [
  {
    value: undefined,
    label: 'None'
  },
  {
    value: 'Google',
    label: 'Google'
  },
  {
    value: 'Social Media',
    label: 'Social Media'
  },
  {
    value: 'Friend referal',
    label: 'Friend referal'
  }
]

export default function AccountForm(props) {
  const {
    formField: {
      Email,
      Password,
      ConfirmPassword,
      FindUs,
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom> 
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input name={Email.name} label={Email.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input name={Password.name} label={Password.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
         <Input name={ConfirmPassword.name} label={ConfirmPassword.label} fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name={FindUs.name}
            label={findAllByDisplayValue.label}
            data={Findus}
            fullWidth
            />
         </Grid>
         </Grid>
    </React.Fragment>
  );
}
