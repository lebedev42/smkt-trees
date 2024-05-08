import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import clsx from 'clsx';

import { SwgViewer } from '../../widgets/swg-viewer';

import {
  useMapQuery,
  useGameMutation,
  useMapMutation,
  useStatusQuery,
  useStatusMutation,
} from '../../entities/map/api';

import { MapItem } from '../../entities/map/api/types';

import { Welcome } from '../../widgets/welcome';
import { Result } from '../../widgets/result';

import * as Styled from './Home.styled';

const Home = () => {
  const [mapType, setMapType] = useState<'firstMap' | 'secondMap' | null>(null);

  const [user, setUser] = useState<any>(null);
  const [statusId, setStatusId] = useState<any>(null);

  useEffect(() => {
    window.Telegram.WebApp.expand();

    const parsed = queryString.parse(location.search);

    if (parsed?.user) {
      const user = Array.isArray(parsed.user) ? parsed.user[0] : parsed.user;

      if (user) {
        setUser(user);
      }
    }

    if (parsed?.statusId) {
      const statusId = Array.isArray(parsed.statusId)
        ? parsed.statusId[0]
        : parsed.statusId;

      if (statusId) {
        setStatusId(statusId);
      }
    }
  }, []);

  const { data, isLoading, isError } = useMapQuery(mapType);
  const {
    data: status,
    isLoading: isStatusLoading,
    isError: isStatusError,
  } = useStatusQuery(statusId);

  const { useSendGameResult } = useGameMutation();
  const { useUpdateMap } = useMapMutation();
  const { useUpdateStatus } = useStatusMutation();

  const [selectedSector, setSelectedSector] = useState<MapItem | null>(null);
  const [finished, setFinished] = useState(false);

  const handleCitySelect = (mapType: 'firstMap' | 'secondMap') => {
    setMapType(mapType);
  };

  const handleSubmit = () => {
    if (!selectedSector || selectedSector.available === 0) {
      return;
    }

    const coords = {
      latitude: mapType === 'firstMap' ? '59.731966015753095' : '56.326397',
      longitude: mapType === 'firstMap' ? '30.394953489303592' : '60.932168',
    };

    const resultData = {
      user: user,
      latitude: coords.latitude,
      longitude: coords.longitude,
      city: mapType === 'firstMap' ? 'spb' : 'ekb',
      sector: selectedSector.number,
    };

    useSendGameResult(resultData, {
      onSuccess: (response: any) => {
        console.error('response', response);
      },
    });

    const updateData = {
      map: selectedSector,
      name: mapType,
    };

    useUpdateMap(updateData, {
      onSuccess: (response: any) => {
        useUpdateStatus({ id: statusId, status: true });
      },
    });

    setFinished(true);
  };

  if (isLoading || isStatusLoading) {
    return <Styled.Wrapper></Styled.Wrapper>;
  }

  if (isError || isStatusError) {
    return <Styled.Wrapper></Styled.Wrapper>;
  }

  const isStatus = Array.isArray(status) ? status[0] : status;

  if (isStatus) {
    return (
      <Styled.Wrapper>
        <Result>Вы уже выбрали сектор для дерева</Result>
      </Styled.Wrapper>
    );
  }

  return (
    <Styled.Wrapper>
      {data.length ? (
        finished ? (
          <Result>
            Отлично!
            <br />
            Вы выбрали сектор № {selectedSector?.number}.
            <br />
            Вернитесь в чат-бот, чтобы дать имя вашему дереву
          </Result>
        ) : (
          <Styled.Content>
            <Styled.Title>
              Приближайте карту, чтобы выбрать сектор для дерева
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
