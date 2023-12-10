import React from 'react'
import Hero from './../components/hero/Hero';
import Services from './../components/services/Services';
import SubHero from './../components/hero/SubHero';
import WhyUs from './../components/why/WhyUs';

const home = () => {
  return (
    <div>
        <Hero />
      <SubHero />
      <Services />
      <WhyUs />
    </div>
  )
}

export default home