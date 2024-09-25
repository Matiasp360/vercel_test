import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ height: string }>`
  display: flex;
  align-items: center;
  background-color: #A8BCC7;
  padding: 0 2vh;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: ${props => props.height};
`;

const Label = styled.span`
  color: #333;
  font-size: 2.5vh;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1.5vh;
  margin-left: auto;
`;

const Icon = styled.img<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  object-fit: contain;
  border-radius: 50%;
  background: white;
`;

interface IconLabelContainerProps {
  label: string;
  icons: { src: string; alt: string; size: string }[];
  height: string;
}

const IconLabelContainer: React.FC<IconLabelContainerProps> = ({ label, icons, height }) => {
  return (
    <Container height={height}>
      <Label>{label}</Label>
      <IconContainer>
        {icons.map((icon, index) => (
          <Icon key={index} src={icon.src} alt={icon.alt} size={icon.size} />
        ))}
      </IconContainer>
    </Container>
  );
};

export default IconLabelContainer;
