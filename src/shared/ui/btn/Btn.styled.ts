import styled from 'styled-components';

export const Btn = styled.button<{ typeBtn: 'white' | 'green' }>`
  display: flex;

  border: none;
  outline: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 17px 18px;
  gap: 5px;

  background: ${(props) => (props.typeBtn === 'white' ? '#FFFFFF' : '#80BA27')};
  border-radius: 14px;

  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 29px;
  text-align: center;

  color: ${(props) => (props.typeBtn === 'white' ? '#000000' : '#FAFFF7')};

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    background: #b6b6b6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 7.13893px 7.55886px;
    gap: 2.1px;

    border-radius: 5.87912px;

    font-size: 10px;
    line-height: 12px;
  }
`;
