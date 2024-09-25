import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 2%;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  background: #F2F6F8;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 350px;
  max-width: 90%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #24313D;
`;

const Input = styled.input`
  width: calc(100% - 1.5rem);
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: calc(100% - 1.5rem);
  padding: 0.75rem;
  background-color: #204e5b;
  border: none;
  border-radius: 8px;
  color: #e0f4f4;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  box-sizing: border-box;

  &:hover {
    background-color: #123a47;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 0.875rem;
  margin-top: 0.75rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('authToken', 'fake-token');
      navigate('/');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <MainWrapper>
      <FormContainer>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Iniciar Sesión</Button>
        </form>
      </FormContainer>
    </MainWrapper>
  );
};

export default Login;
