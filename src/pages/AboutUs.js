import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const AboutUsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background: #f0f0f0;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #333;
  max-width: 800px;
  text-align: justify;
  margin-bottom: 1rem;
`;

const AboutUs = () => {
    return (
        <AboutUsContainer>
            <Title>About Us</Title>
            <Subtitle>Innovating the Future Through Minimalist Design</Subtitle>
            <Paragraph>
                We live in a complex world, saturated with endless choices and intricate designs. It's our belief that
                complexity should not hinder user experience but should enhance it. This is why we embrace the
                philosophy of future minimalism.
            </Paragraph>
            <Paragraph>
                At OurBrand, we focus on delivering sleek, intuitive, and empowering digital products that strip away
                the non-essentials. Why clutter your life with excessive buttons, tabs, and options when you can achieve
                more with less?
            </Paragraph>
            <Paragraph>
                Our product designs are guided by two key principles: simplicity and functionality. Whether it's a piece
                of software that solves a complex problem or a gadget that makes your everyday life easier, we make sure
                it's straightforward, user-friendly, and, most importantly, useful.
            </Paragraph>
            <Paragraph>
                We don't just follow trends; we set them. The future of design is minimalist, and we are here to lead
                the way.
            </Paragraph>
        </AboutUsContainer>
    );
};

export default AboutUs;
