import React from 'react';
import { Snackbar, Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';
import { styled } from '@mui/system';

interface AlertProps extends MuiAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

const StyledAlert = styled(MuiAlert)<{ type: 'success' | 'error' }>`
  font-size: 1.2rem;
  max-width: 600px;
  width: 100%;
  background-color: ${(props) =>
    props.type === 'success' ? '#66bb6a' : '#e57373'};
  color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Alert: React.FC<AlertProps> = ({ open, onClose, message, type }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <StyledAlert
      onClose={onClose}
      severity={type}
      variant="filled"
      type={type}
    >
      {message}
    </StyledAlert>
  </Snackbar>
);

export default Alert;
