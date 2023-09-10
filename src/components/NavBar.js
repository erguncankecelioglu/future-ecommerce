import React, {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, useNavigate} from "react-router-dom";

const Logo = styled.div`
  img {
    width: 150px;
    height: auto;
    cursor: pointer;
  }
`;

const Hamburger = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavBarContainer = styled(motion.nav)`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const NavItems = styled.div`
  display: flex;
  justify-content: flex-start;
  @media (max-width: 768px) {
    display: ${({open}) => (open ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: white;
    margin: 0 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #f0f0f0;
    }
  }
`;

const NavItemsRight = styled(NavItems)`
  justify-content: flex-end;
  margin-right: 1rem;
  @media (max-width: 768px) {
    display: ${({open}) => (open ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-right: 0rem;
  }
`;

const navVariants = {
    hidden: {opacity: 0, y: '100%'},
    visible: {opacity: 1, y: 0, transition: {duration: 0.7}}
};

const NavBar = () => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <NavBarContainer
            variants={navVariants}
            initial="hidden"
            animate="visible"
        >
            <Hamburger onClick={() => setOpen(!open)}>
                {open ? '✖' : '☰'}
            </Hamburger>
            <NavItems open={open}>
                <Link to="/my-account">My Account</Link>
                <Link to="/shop">Shop</Link>
            </NavItems>
            <Logo onClick={() => navigate('/')}><img src={`logo.png`} alt="My Logo"/></Logo>
            <NavItemsRight open={open}>
                <Link to={"/cart"}>Cart</Link>
            </NavItemsRight>
        </NavBarContainer>
    );
};

export default NavBar;
