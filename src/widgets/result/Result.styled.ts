import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 475px) {
    gap: 20px;
  }
  @media (max-width: 320px) {
    gap: 15px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/result-bg.png');

  width: 100%;
  height: 100vh;

  padding: 80px 30px 70px;

  @media (max-width: 380px) {
    padding: 50px 20px 80px;
  }
  @media (max-width: 320px) {
    padding: 60px 5px 90px;
  }
`;

export const Title = styled.h1`
  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 115%;
  letter-spacing: -0.02em;

  color: #ffffff;

  margin-bottom: 20px;

  @media (max-width: 360px) {
    font-size: 20px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Btn = styled.button<{ typeBtn: 'white' | 'red' }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  opacity: 1;

  background-color: ${(props) =>
    props.typeBtn === 'white' ? '#FFFFFF' : '#ff335f'};
  color: ${(props) => (props.typeBtn === 'white' ? '#FF335F' : '#FFFFFF')};

  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.02em;
  text-align: center;

  font-size: 16px;
  padding: 10px 30px;
  border-radius: 30px;

  width: 100%;

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    opacity: 0;
    cursor: not-allowed;
  }
`;
