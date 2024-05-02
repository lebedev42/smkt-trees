import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #ff335f;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 120px 30px 170px;

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

  font-size: 18px;
  line-height: 24px;

  padding: 16px 50px;
  border-radius: 28px;

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    opacity: 0;
    cursor: not-allowed;
  }
`;
