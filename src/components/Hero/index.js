import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const HeroContainer = styled(motion.div)`
  background: #f0f0f0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 3rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 576px) {
    font-size: 1.3rem;
  }

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const Hero = () => {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: 1}}
    };

    return (
        <HeroContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            position="relative"
        >
            <h1>Welcome to the Future.</h1>
        </HeroContainer>
    );
};

export default Hero;
