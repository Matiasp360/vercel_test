import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsIcon from '@mui/icons-material/Settings';
import Popup from './Popup';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const StyledButton = styled.button`
  margin-top: 10vh;
  background: #F2F6F8;
  border-radius: 50px;
  padding: 1vh 2vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  font-size: 2.5vh;
  font-family: 'Open Sans', sans-serif;
  color: #24313D;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

interface SettingsProps {
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
}

const Settings: React.FC<SettingsProps> = ({ setPrompt, prompt }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOpenPasswordDialog = () => {
    setPasswordDialogOpen(true);
  };

  const handleClosePasswordDialog = () => {
    setPasswordDialogOpen(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleLogin = () => {
    if (username === 'admin' && password === 'secret') {
      setPasswordDialogOpen(false);
      setPopupVisible(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <StyledButton onClick={handleOpenPasswordDialog}>
        <SettingsIcon style={{ marginRight: '2vh', color: '#333' }} />
        <span>Configuracion Admin</span>
      </StyledButton>

      <Dialog open={isPasswordDialogOpen} onClose={handleClosePasswordDialog}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>

      {isPopupVisible && (
        <Popup
          title="Ajustar prompt"
          onClose={() => setPopupVisible(false)}
          onSave={(e) => {setPrompt(e); setPopupVisible(false);}}
          prompt={prompt}
        />
      )}
    </>
  );
};

export default Settings;