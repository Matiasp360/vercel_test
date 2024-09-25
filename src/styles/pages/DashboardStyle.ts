import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90vh;
  padding: 2%;
  box-sizing: border-box;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0vh;
  margin-top: 10vh;
`;

export const MiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
`;

export const LargeButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 15px;
  width: 350px;
  height: 200px;
  background-color: transparent;
`;

export const CentralButton = styled.div`
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
  width: 400px;
`;

export const SpacedContainer = styled.div`
  margin-bottom: 20px;
`;