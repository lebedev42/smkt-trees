import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 20px;
  width: 100%;

  background: url('/map-bg.png') repeat center center;
  background-size: 66px 66px;

  .mapCeil {
    fill: #16615d;
  }
`;

export const Selected = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 26px;

  background: #ffffff;
  border-radius: 20px;
  border: 2px solid #16615d;

  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #16615d;
`;
