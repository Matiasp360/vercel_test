import React from 'react';
import styled from 'styled-components';
import LogoutButton from './buttons/LogoutButton';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 10vh;
  box-sizing: border-box;
  padding: 3% 3% 0% 0%;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <UserInfo>
      <p style={{ marginRight: '3vh', fontSize: '3vh', color: '#F1F1F1' }}>Usuario Admin</p>
        <LogoutButton/>
      </UserInfo>
    </HeaderWrapper>
  );
};

export default Header;
