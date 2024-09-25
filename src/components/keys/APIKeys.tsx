import React from 'react';
import IconLabelContainer from '../common/IconLabelContainer';
import emailIcon from '../../assets/icons/emailIcon.png';
import whatsapp from '../../assets/icons/whatsapp.png';
import sap from '../../assets/icons/sap.png';
import googleDrive from '../../assets/icons/googleDrive.png';

const APIKeys: React.FC = () => {
  const icons = [
    { src: emailIcon, alt: "Email", size: "4vh" },
    { src: whatsapp, alt: "Whatsapp", size: "4vh" },
    { src: sap, alt: "Sap", size: "4vh" },
    { src: googleDrive, alt: "Google Drive", size: "3.5vh" },
  ];

  return <IconLabelContainer label="Claves API" icons={icons} height="6vh" />;
};

export default APIKeys;
