import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import WebFont from 'webfontloader';
import {useNavigate} from "react-router-dom";
import {useAuth} from '../context/AuthContext';
import Settings from "../components/Settings";

WebFont.load({
    google: {
        families: ['Poppins:400,600', 'sans-serif'],
    },
});

const DashboardContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding-bottom: 20px;
  }
`;

const Header = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 3rem;
  color: #333;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContentArea = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Sidebar = styled.div`
  width: 30%;
  height: 100%;
  background: #333;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 10px;
  padding: 15px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px;
  }
`;

const Accordion = styled.div`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    padding: 5px;
    margin: 5px;
  }
`;

const AccordionContent = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  padding: 10px;
  border-top: 1px solid #ccc;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const ScrollableOrders = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  max-height: calc(100vh - 60%);
  overflow-y: auto;
`;


const MainContent = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  width: 70%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  height: 100%;
  font-size: 1.5rem;
  color: #333;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    font-size: 1.2rem;
  }
`;

const AccountDashboard = () => {
    const [activePage, setActivePage] = useState('Home');
    const [localOrders, setLocalOrders] = useState([]);
    const {logout, currentUser} = useAuth();
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            const fetchOrders = async () => {
                try {
                    const token = sessionStorage.getItem('jwt');
                    const username = sessionStorage.getItem('user');

                    const response = await fetch(`/api/orders`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'X-Username': username
                        }
                    });

                    if (response.status === 200) {
                        const data = await response.json();
                        setLocalOrders(data);
                        console.log(data);
                    } else {
                        console.log(response);
                        console.log('No orders found or some issue with fetching.');
                    }
                } catch (error) {
                    console.error('There was a problem fetching the orders:', error);
                }
            };

            fetchOrders();
        }
    }, [currentUser, navigate]);

    return (
        <DashboardContainer>
            <Header>Your Account Dashboard</Header>
            <ContentArea>
                <Sidebar>
                    <Button onClick={() => setActivePage('Orders')}>Orders</Button>
                    <Button onClick={() => setActivePage('Settings')}>Settings</Button>
                    <Button onClick={() => logout()}>Logout</Button>
                </Sidebar>
                <MainContent>
                    {activePage === 'Orders' && (
                        <ScrollableOrders>
                            {localOrders.length === 0 ? (
                                <p>No orders to display. Maybe buy something?</p>
                            ) : (
                                localOrders.map((order, index) => {
                                    const parsedItems = JSON.parse(order.items);

                                    return (
                                        <Accordion key={index} onClick={() => setOpenIndex(index)}>
                                            <p>Order ID: {order.id}</p>
                                            <AccordionContent open={openIndex === index}>
                                                <p>Ordered Items:</p>
                                                <ul>
                                                    {parsedItems.map((item, itemIndex) => (
                                                        <li key={itemIndex}>
                                                            {item.name} - Price: {item.price} -
                                                            Quantity: {item.quantity}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p>Total Value: {order.totalValue}</p>
                                                <p>Date: {new Date(order.date).toLocaleString()}</p>
                                            </AccordionContent>
                                        </Accordion>
                                    );
                                })
                            )}
                        </ScrollableOrders>
                    )}
                    {activePage === 'Settings' && <Settings/>}
                </MainContent>
            </ContentArea>
        </DashboardContainer>
    );
};

export default AccountDashboard;
