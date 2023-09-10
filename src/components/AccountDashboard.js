import React, {useState} from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 3rem;
`;

const ContentArea = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
`;

const Sidebar = styled.div`
  width: 30%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const MainContent = styled.div`
  width: 70%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const AccountDashboard = () => {
    const [activePage, setActivePage] = useState('Home');

    return (
        <DashboardContainer>
            <Header>Your Account Dashboard</Header>
            <ContentArea>
                <Sidebar>
                    <button onClick={() => setActivePage('Home')}>Home</button>
                    <button onClick={() => setActivePage('Orders')}>Orders</button>
                    <button onClick={() => setActivePage('Settings')}>Settings</button>
                </Sidebar>
                <MainContent>
                    {activePage === 'Home' && <div>Welcome to your account.</div>}
                    {activePage === 'Orders' && <div>These are your orders.</div>}
                    {activePage === 'Settings' && <div>These are your settings.</div>}
                </MainContent>
            </ContentArea>
        </DashboardContainer>
    );
};

export default AccountDashboard;
