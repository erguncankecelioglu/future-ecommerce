import styled from "styled-components";

const Footer = styled.div`
  background: #f0f0f0;
  padding: 2rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

export { Footer, FooterInfo };
