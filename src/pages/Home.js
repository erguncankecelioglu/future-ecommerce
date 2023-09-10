import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import styled from "styled-components";


const MainContent = styled.div`
  padding-bottom: 4rem;

  @media (max-width: 768px) {
    padding-bottom: 0;

  }

  @media (max-width: 1024px) {
    padding-bottom: 0;

  }
`;


const Home = () => {
    return (
        <>
            <Hero/>
            <MainContent>
                <FeaturedProducts/>
                <AboutUs/>
                <Testimonials/>
            </MainContent>

        </>
    );
};

export default Home;
