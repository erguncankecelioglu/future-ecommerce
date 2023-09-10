import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const TestimonialContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2rem;
`;

const TestimonialCard = styled(motion.div)`
  width: 200px;
  height: 300px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
`;

const TestimonialName = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const TestimonialText = styled.p`
  font-style: italic;
`;

const Testimonials = () => {
    const testimonialData = [
        {
            name: 'Jane Doe',
            text: 'This app changed my life. A must-have!',
        },
        {
            name: 'John Smith',
            text: 'Finally, something that works. Highly recommend it.',
        },
        {
            name: 'Emily Davis',
            text: 'Can\'t believe how good this is. 10/10!',
        }
    ];

    return (
        <TestimonialContainer>
            {testimonialData.map((testimonial, index) => (
                <TestimonialCard
                    key={index}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: index * 0.5}}
                >
                    <TestimonialName>{testimonial.name}</TestimonialName>
                    <TestimonialText>"{testimonial.text}"</TestimonialText>
                </TestimonialCard>
            ))}
        </TestimonialContainer>
    );
};

export default Testimonials;
