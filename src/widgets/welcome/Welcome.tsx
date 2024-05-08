import React from 'react';

import * as Styled from './Welcome.styled';

interface WelcomeProps {
  handleCitySelect: (city: 'firstMap' | 'secondMap') => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ handleCitySelect }) => {
  return (
    <Styled.Container>
      <Styled.Title>
        Выберите город, в котором хотите посадить дерево
      </Styled.Title>
      <Styled.Actions>
        <Styled.Btn
          typeBtn="white"
          onClick={() => handleCitySelect('firstMap')}
        >
          Санкт-Петербург
        </Styled.Btn>
        <Styled.Btn
          typeBtn="white"
          onClick={() => handleCitySelect('secondMap')}
        >
          Екатеринбург
        </Styled.Btn>
      </Styled.Actions>
    </Styled.Container>
  );
};
