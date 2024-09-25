import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Card } from '../styles/components/Card';
import styled from 'styled-components';
import { downloadFileByName } from '../services/FileService';
import { downloadFile } from '../utils/utils';
import * as XLSX from 'xlsx';
import { AlertContext } from '../utils/context/AlertContext';

const StatusText = styled.p`
  margin: 5px 0;
  font-size: 1.9vh;
  color: #24313D;
`;



const Download: React.FC<{ downloadStatus: string, fileName: string }> = ({ downloadStatus, fileName }) => {
  const { showAlert } = useContext(AlertContext)!;
  const generateExcelFile = (data:any) => {
    let ws1 = null;
    let ws2 = null;
    if (data?.length > 0)
       ws1 = XLSX.utils.json_to_sheet(data);

    if (data?.seccion_de_errores?.length > 0)
       ws2 = XLSX.utils.json_to_sheet(data.seccion_de_errores);
    const wb = XLSX.utils.book_new();

    ws1 && XLSX.utils.book_append_sheet(wb, ws1, 'Hoja Principal');
    ws2 && XLSX.utils.book_append_sheet(wb, ws2, 'Sección de Errores');

    XLSX.writeFile(wb, 'datos.xlsx');
  };


const handleDownloadClick = async () => {
    console.log("descargar");

    try {
      const result = fileName.replace(/^```json\s*/m, '')
      .replace(/\s*```$/m, '');
      const json = JSON.parse(result);
      const jsonArray = Array.isArray(json) ? json : [json];
      generateExcelFile(jsonArray);
      showAlert('Excel descargado correctamente', 'success');
    } catch (error) {
      showAlert('Error al descargar, excel con formato invalido.', 'error');
      console.error('Error al descargar el archivo:', error);
    }
};

  return (
    <Card>
      <div>
        <h3>Descargar</h3>
        <StatusText>{downloadStatus}</StatusText>
      </div>
      <IconButton onClick={async() => await handleDownloadClick()}>
        <DownloadIcon />
      </IconButton>
    </Card>
  );
};

export default Download;
