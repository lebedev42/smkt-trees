import React, { useState } from 'react';
import clsx from 'clsx';

import { SwgViewer } from '../../widgets/swg-viewer';

import { useMapQuery } from '../../entities/map/api';
import { MapItem } from '../../entities/map/api/types';

import * as Styled from './Home.styled';
import { Welcome } from '../../widgets/welcome';

const Home = () => {
  const [mapType, setMapType] = useState('');

  const { data, isLoading, isError } = useMapQuery(mapType);

  const [selectedSector, setSelectedSector] = useState<MapItem | null>(null);

  const handleCitySelect = (mapType: string) => {
    setMapType(mapType);
  };

  const handleSubmit = () => {
    if (!selectedSector || selectedSector.available === 0) {
      return;
    }

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
        <Styled.Content>
          <Styled.Title>
            Приближайте карту, чтобы выбрать сектор для своего дерева
          </Styled.Title>
          <SwgViewer
            selected={selectedSector}
            handleSelect={setSelectedSector}
            mapType="firstMap"
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
      ) : (
        <Welcome handleCitySelect={handleCitySelect} />
      )}
    </Styled.Wrapper>
  );
};

export default Home;
