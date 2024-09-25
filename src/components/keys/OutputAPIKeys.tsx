import React from 'react';
import IconLabelContainer from '../common/IconLabelContainer';
import settings from '../../assets/icons/settings.png';

const OutputAPIKeys: React.FC = () => {
  const icons = [
    { src: settings, alt: "Settings", size: "4vh" },
  ];

  return <IconLabelContainer label="Claves de API de salida" icons={icons} height="6vh" />;
};

export default OutputAPIKeys;
