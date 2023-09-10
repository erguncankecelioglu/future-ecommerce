import React from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  flex: 1;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;


const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Settings = () => {
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        console.log("Profile Updated");
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        console.log("Password Updated");
    };

    return (
        <SettingsContainer>
            <SectionTitle>-</SectionTitle>
            <Form onSubmit={handleProfileSubmit}>
                <FormItem>
                    <Label>Username</Label>
                    <Input type="text" placeholder="Your username"/>
                </FormItem>

                <FormItem>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Your email"/>
                </FormItem>

                <SubmitButton type="submit">Update Profile</SubmitButton>
            </Form>

            <SectionTitle>Change Password</SectionTitle>
            <Form onSubmit={handlePasswordSubmit}>
                <FormItem>
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Current password"/>
                </FormItem>

                <FormItem>
                    <Label>New Password</Label>
                    <Input type="password" placeholder="New password"/>
                </FormItem>

                <FormItem>
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password"/>
                </FormItem>

                <SubmitButton type="submit">Change Password</SubmitButton>
            </Form>
        </SettingsContainer>
    );
};

export default Settings;
