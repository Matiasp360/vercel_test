import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';

const LogoutButtonStyle = styled(IconButton)`
  background-color: #ffffff; 
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 8vh;
  width: 8vh;
  &:hover {
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <LogoutButtonStyle onClick={handleLogout}>
      <LogoutIcon style={{ width: "4vh", height: "4vh", color: '#F1F1F1' }} />
    </LogoutButtonStyle>
  );
};

export default LogoutButton;
