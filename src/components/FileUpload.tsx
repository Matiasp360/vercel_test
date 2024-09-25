 
import React, { useState, ChangeEvent, useContext } from 'react';
import { IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { FileUploadType } from '../types';
import { Card } from '../styles/components/Card';
import styled from 'styled-components';
import { AlertContext } from '../utils/context/AlertContext';
import { uploadFiles } from '../services/FileService';
import { filesToJson } from '../services/P360';
import { filesToJsonOpenAI } from '../services/P360';

const HiddenInput = styled.input`
  display: none;
`;

const FileCountText = styled.p`
  margin: 5px 0;
  font-size: 1.9vh;
  color: #24313D;
`;

const FileTypeText = styled.small`
  font-size: 1.5vh;
  color: #24313D;
`;


async function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader?.result?.toString();
      const base64Data = result?.split(',')[1];
      resolve(base64Data)
    }
    reader.onerror = reject
  })
}
     

const FileUpload: React.FC<FileUploadType> = ({ setFiles, setLoading }) => {
  const [fileCount, setFileCount] = useState<number>(0);
  const { showAlert } = useContext(AlertContext)!;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = event.target.files;
    if (files) {
      setFileCount(files.length);
      const filesUploaded: any[] = [];
      let allFilesUploaded = true;

      for (let i = 0; i < files.length; i++) {
        try {
          const file = await getBase64(files[i]);
          filesUploaded.push({file, type: files[i].type});
        } catch (error) {
          allFilesUploaded = false;
        }
      }
      let allDocumentsJson = []

      const filesPerBatch = 1;
      let batch:any = [];
      console.log("Documentos de entrada en formato json:");
      for (let index = 0; index < filesUploaded.length; index++) {
        batch.push(filesUploaded[index]);
      
        if (batch.length === filesPerBatch || index === filesUploaded.length - 1) {
          const response = await filesToJsonOpenAI(batch);
          allDocumentsJson.push(response);
          batch = [];
        }
      }

      setFiles(allDocumentsJson);
      setLoading(false);
      if (allFilesUploaded) {
        showAlert('Todos los archivos fueron subidos correctamente.', 'success');
      } else {
        showAlert('Algunos archivos no se pudieron subir.', 'error');
      }
    }
  };

  return (
    <Card>
      <div>
        <h3>Subir Archivos</h3>
        <FileCountText>
          {fileCount} Documento{fileCount !== 1 ? 's' : ''} listo{fileCount !== 1 ? 's' : ''}
        </FileCountText>
        <FileTypeText>PDF, JPEG, PNG</FileTypeText>
      </div>
      <label htmlFor="file-upload">
        <IconButton component="span">
          <UploadIcon />
        </IconButton>
        <HiddenInput
          id="file-upload"
          type="file"
          accept=".pdf, .png, .jpeg, .jpg"
          onChange={handleFileChange}
          multiple
        />
      </label>
    </Card>
  );
};

export default FileUpload;
