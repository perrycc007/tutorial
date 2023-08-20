import React from 'react';
import PropTypes from 'prop-types';
import classes from './Banner.module.css'; // Import the corresponding CSS file

function Banner({  title, description }) {


  return (
    <div className={classes.banner} >
      <div className={classes.bannerContent}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}



export default Banner;
