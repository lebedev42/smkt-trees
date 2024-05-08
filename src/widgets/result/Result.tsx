import React from 'react';
import * as Styled from './Result.styled';

interface ResultProps {
  children: React.ReactNode;
}

export const Result: React.FC<ResultProps> = ({ children }) => {
  const handleBack = () => {
    if (window.Telegram) {
      window.Telegram.WebApp.close();
    }
  };

  return (
    <Styled.Container>
      <Styled.Title>{children}</Styled.Title>
      <Styled.Actions>
        <Styled.Btn typeBtn="white" onClick={handleBack}>
          Вернуться
        </Styled.Btn>
      </Styled.Actions>
    </Styled.Container>
  );
};
