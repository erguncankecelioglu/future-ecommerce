// LoginComponent.js
import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext'; // <-- Import the context here
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

const LoginForm = styled.form`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 6rem auto;
  padding: 1.5rem;
  border-radius: 12px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const InputField = styled.input`
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  border: 1px solid white;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.1rem;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #000000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #f4fafd;
    color: #000000
  }
`;

const RegisterButton = styled(SubmitButton)`
  background: #6c757d;

  &:hover {
    background: #5a6268;
  }
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const {login, register} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(username, password);
        if (result.error) {
            setError(result.error);
            setSuccess(null);
        } else {
            setSuccess("Logged in successfully!");
            setError(null);
            setTimeout(() => {
                    navigate('/');
                }
                , 1000);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const result = await register(username, password);
        if (result.error) {
            setError(result.error);
            setSuccess(null);
        } else {
            setSuccess("Registered successfully! You can login.");
            setError(null);
        }
    };

    return (
        <LoginForm>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {success && <div style={{color: 'green'}}>{success}</div>}
            <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton onClick={handleLogin}>Login</SubmitButton>
            <RegisterButton onClick={handleRegister}>Register</RegisterButton>
        </LoginForm>
    );
};

export default Login;

