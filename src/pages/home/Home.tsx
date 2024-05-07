import React, { useState } from 'react';
import queryString from 'query-string';
import clsx from 'clsx';

import { SwgViewer } from '../../widgets/swg-viewer';

import { useMapQuery, useGameMutation } from '../../entities/map/api';
import { MapItem } from '../../entities/map/api/types';

import { Welcome } from '../../widgets/welcome';
import { Result } from '../../widgets/result';

import * as Styled from './Home.styled';

const Home = () => {
  const [mapType, setMapType] = useState<'firstMap' | 'secondMap' | null>(null);

  const { data, isLoading, isError } = useMapQuery(mapType);

  const { useSendGameResult } = useGameMutation();

  const [selectedSector, setSelectedSector] = useState<MapItem | null>(null);
  const [finished, setFinished] = useState(false);

  const handleCitySelect = (mapType: 'firstMap' | 'secondMap') => {
    setMapType(mapType);
  };

  const handleSubmit = () => {
    if (!selectedSector || selectedSector.available === 0) {
      return;
    }

    setFinished(true);

    const resultData = {
      user: '',
      longitude: selectedSector.coordinates[0],
      latitude: selectedSector.coordinates[1],
      city: mapType === 'firstMap' ? 'spb' : 'ekb',
    };

    const parsed = queryString.parse(location.search);

    if (parsed?.user) {
      const user = Array.isArray(parsed.user) ? parsed.user[0] : parsed.user;

      if (user) {
        resultData.user = user;
      }
    }

    useSendGameResult(resultData, {
      onSuccess: (response: any) => {
        console.error('response', response);
      },
    });

    console.log(selectedSector);
  };

  if (isLoading) {
    return <Styled.Wrapper></Styled.Wrapper>;
  }

  if (isError) {
    return <Styled.Wrapper></Styled.Wrapper>;
  }

  return (
    <Styled.Wrapper>
      {mapType ? (
        finished ? (
          <Result sector={selectedSector?.number} />
        ) : (
          <Styled.Content>
            <Styled.Title>
              Приближайте карту, чтобы выбрать сектор для своего дерева
            </Styled.Title>
            <SwgViewer
              selected={selectedSector}
              handleSelect={setSelectedSector}
              mapType={mapType}
              mapData={data}
            />

            <Styled.Btn
              typeBtn="white"
              onClick={handleSubmit}
              className={clsx({
                disabled: !selectedSector || selectedSector.available === 0,
              })}
            >
              Выбрать
            </Styled.Btn>
          </Styled.Content>
        )
      ) : (
        <Welcome handleCitySelect={handleCitySelect} />
      )}
    </Styled.Wrapper>
  );
};

export default Home;
