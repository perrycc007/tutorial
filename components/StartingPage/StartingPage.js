import React from 'react';
import Introduce from './Introduce.js';
import HeroSection from './HeroSection.js';
import About from './About.js'

function Home() {
  return (
    <>
      <HeroSection />
      <Introduce />
      <About />
    </>
  );
}

export default Home;
