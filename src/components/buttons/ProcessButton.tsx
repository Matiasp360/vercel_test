import React, { useContext } from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { processFiles } from '../../services/P360';
import { ProcessButtonType } from '../../types';
import processFile from '../../assets/images/processFile.png'; 
import { AlertContext } from '../../utils/context/AlertContext';

const ProcessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
`;

const StyledIconButton = styled(IconButton)`
  border-radius: 50%;
  width: 25vh;
  height: 25vh;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 30px 30px rgba(203, 244, 244, 0.5);

  &:hover {
    box-shadow: 0 0 35px 15px rgba(203, 244, 244, 0.9);
  }

  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%; 
    object-fit: cover;
    display: block;
    margin: 0;
    padding: 0;
  }
`;

const ProcessButton: React.FC<ProcessButtonType> = ({ files, setDownloadStatus, setFileName, setLoading, prompt }) => {
  const { showAlert } = useContext(AlertContext)!;

  const handleClick = async () => {
    setLoading(true);
    try {
      setDownloadStatus('Procesando...')
      const response = await processFiles(files, prompt);
      setLoading(false);
      if (response === "") {
        showAlert('No se pudieron procesar los archivos.', 'error');
        setDownloadStatus('Pendiente de procesamiento');
      } else {
        setFileName(response);
        showAlert('Todos los archivos fueron procesados correctamente.', 'success');
        setDownloadStatus('Listo para descargar');
      }
    } catch (error) {
      setLoading(false);
      showAlert('No se pudieron procesar los archivos.', 'error');
      setDownloadStatus('Pendiente de procesamiento');
    }
  };

  return (
    <ProcessWrapper>
      <StyledIconButton onClick={handleClick}>
        <img src={processFile} alt="Process File Icon" />
      </StyledIconButton>
      <div style={{ paddingTop: '3vh' }}>
        <p style={{ margin: '5px 0', fontSize: '3vh', color: '#F1F1F1' }}>Procesar Archivos</p>
      </div>
    </ProcessWrapper>
  );
};

export default ProcessButton;
