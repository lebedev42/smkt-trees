import React from 'react';
import * as Styled from './Result.styled';

interface ResultProps {
  sector: number | undefined;
}

export const Result: React.FC<ResultProps> = ({ sector }) => {
  const handleBack = () => {
    if (window.Telegram) {
      window.Telegram.WebApp.close();
    }
  };

  return (
    <Styled.Container>
      <Styled.Title>
        Отлично!
        <br />
        Вы выбрали сектор № {sector}.
        <br />
        Вернитесь в чат-бот, чтобы дать имя вашему дереву
      </Styled.Title>
      <Styled.Actions>
        <Styled.Btn typeBtn="white" onClick={handleBack}>
          Вернуться
        </Styled.Btn>
      </Styled.Actions>
    </Styled.Container>
  );
};
