import React from 'react';
import styled from 'styled-components';
import WebFont from 'webfontloader';
import {Link} from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

WebFont.load({
    google: {
        families: ['Poppins:400,600', 'sans-serif']
    }
});

const AboutContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: #eee;
  padding: 4rem;
  text-align: center;
`;

const AboutUs = () => {
    return (
        <AboutContainer>
            <h2>
                <StyledLink to="/about-us">About Us</StyledLink>
            </h2>
            <p>We are the best in the business.</p>
        </AboutContainer>
    );
};

export default AboutUs;
