export interface FilesUploaded {
  fileName: string,
  file: string,
  type: string,
}


export interface FileUploadType {
    setFiles: React.Dispatch<React.SetStateAction<any[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProcessButtonType {
  prompt: string;
  files: any[],
  setDownloadStatus: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ResetButtonType {
  setDownloadStatus: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}
