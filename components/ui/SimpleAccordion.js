import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DateTime from './DateTime'

const SimpleAccordion = (props) => {
  return (
    <div>
      <DateTime></DateTime>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(3)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Typography>{props.title}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Typography>{props.address}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
            <button onClick={props.clicked}>
                {props.isFav ? 'Remove from Favorites' : 'To Favorites'}
            </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SimpleAccordion;
