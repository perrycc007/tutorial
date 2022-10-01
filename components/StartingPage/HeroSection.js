import React from 'react';
import classes from './HeroSection.module.css';

function HeroSection() {
  return (
    <div className={classes.heroContainer}>
      <h1>快速並免費搜找你的導師</h1>
      <div>
        <button
          className={classes.PriButton}
        >
          尋找導師
        </button>
        <button
          className={classes.PriButton}
        >
         成為導師 
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
