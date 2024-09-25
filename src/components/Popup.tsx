import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';

interface PopupProps {
  title: string;
  onClose: () => void;
  onSave: (value: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  prompt: string;
}

const Popup: React.FC<PopupProps> = ({
  title,
  onClose,
  onSave,
  inputValue = '',
  onInputChange,
  prompt
}) => {
  const [text, setText] = useState(prompt);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    onInputChange?.(newValue);
  };

  const handleSave = () => {
    onSave(text);
  };

  return (
    <>
      <PopupOverlay onClick={onClose} />
      <PopupContainer>
        <PopupHeader>{title}</PopupHeader>
        <StyledTextField 
          label="Ingresa un valor..."
          variant="outlined"
          value={text}
          onChange={handleInputChange}
          fullWidth
          rows={6}
          multiline 
        />
        <PopupButtonWrapper>
          <CloseButton onClick={onClose}>Cerrar</CloseButton>
          <SaveButton onClick={handleSave}>Guardar</SaveButton>
        </PopupButtonWrapper>
      </PopupContainer>
    </>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding: 24px;
  width: 380px;
  max-width: 90%;
  z-index: 1001;
`;

const PopupHeader = styled.h2`
  color: #123a47;
  font-size: 1.4rem;
  margin-bottom: 16px;
  text-align: center;
  font-weight: 600;
`;

const PopupButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const ButtonBase = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  color: #ffffff;
  border: none;
  outline: none;
`;

const CloseButton = styled(ButtonBase)`
  background-color: #297f8f;
  margin-right: 8px;

  &:hover {
    background-color: #24707e;
  }
`;

const SaveButton = styled(ButtonBase)`
  background-color: #204e5b;

  &:hover {
    background-color: #1b434e;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #204e5b;
    }
  }

  .MuiFormLabel-root {
    color: #777;
  }

  .MuiInputBase-input {
    color: #333;
  }
`;

export default Popup;
