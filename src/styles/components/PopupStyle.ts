import styled from "styled-components";

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 90%;
  max-width: 400px;
  z-index: 1000;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  overflow: auto;
`;

export const PopupHeader = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
  text-align: center;
`;

export const PopupInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  box-sizing: border-box;
`;

export const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChecklistItem = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 1em;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EmptyMessage = styled.p`
  font-size: 1em;
  color: #777;
  text-align: center;
  margin: 20px 0;
`;

export const Checkbox = styled.input`
  margin-right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #007bff;
`;

export const PopupButton = styled.button`
  width: 48%;
  background: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s;
  box-sizing: border-box;
  
  &:hover {
    background: #0056b3;
  }
`;

export const PopupButtonWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  width: 100%;
`;

export const CloseButton = styled.button`
  flex: 1; 
  background-color: #f0f0f0;
  border: none;
  padding: 1vh;
  border-radius: 5px;
  cursor: pointer;
  font-size: 2vh;
  color: #333;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;