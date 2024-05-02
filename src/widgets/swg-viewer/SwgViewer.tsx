// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useLayoutEffect, useRef, useState } from 'react';
import * as Styled from './SwgViewer.styled';

import Map from './ui/map.svg';
import { MapItem } from '../../entities/map/api/types';

interface SwgViewerProps {
  selected: MapItem | null;
  handleSelect: (sector: MapItem | null) => void;
  mapType: 'firstMap' | 'secondMap';
  mapData: MapItem[] | undefined;
}

function declOfNum(number: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

export const SwgViewer: React.FC<SwgViewerProps> = (props) => {
  const { selected, handleSelect, mapType, mapData } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const clickHandler = (e: any, ceils: any) => {
    ceils.forEach((ceil) => {
      ceil.style.fill = '#477C79';
    });

    e.target.style.fill = '#16615d';

    const ceilData = mapData.find((item) => item.id === e.target.id);

    handleSelect(ceilData);
  };

  // const clickOutsideHandler = (e: any, ceils: any) => {
  //   if (
  //     e.target.classList.contains('mapCeil') ||
  //     e.target.classList.contains('mapCeilNumber')
  //   ) {
  //     return;
  //   }

  //   ceils.forEach((ceil) => {
  //     ceil.style.fill = '#16615d';
  //   });

  //   handleSelect(null);
  // };

  useLayoutEffect(() => {
    const eventsHandler = {
      haltEventListeners: [
        'touchstart',
        'touchend',
        'touchmove',
        'touchleave',
        'touchcancel',
      ],
      init: function (options) {
        const instance = options.instance;
        let initialScale = 1;
        let pannedX = 0;
        let pannedY = 0;

        // Init Hammer
        // Listen only for pointer and touch events
        this.hammer = Hammer(options.svgElement, {
          inputClass: Hammer.SUPPORT_POINTER_EVENTS
            ? Hammer.PointerEventInput
            : Hammer.TouchInput,
        });

        // Enable pinch
        this.hammer.get('pinch').set({ enable: true });

        // Handle double tap
        this.hammer.on('doubletap', function (ev) {
          instance.zoomIn();
        });

        // Handle pan
        this.hammer.on('panstart panmove', function (ev) {
          // On pan start reset panned variables
          if (ev.type === 'panstart') {
            pannedX = 0;
            pannedY = 0;
          }

          // Pan only the difference
          instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY });
          pannedX = ev.deltaX;
          pannedY = ev.deltaY;
        });

        // Handle pinch
        this.hammer.on('pinchstart pinchmove', function (ev) {
          // On pinch start remember initial zoom
          if (ev.type === 'pinchstart') {
            initialScale = instance.getZoom();
            instance.zoomAtPoint(initialScale * ev.scale, {
              x: ev.center.x,
              y: ev.center.y,
            });
          }

          instance.zoomAtPoint(initialScale * ev.scale, {
            x: ev.center.x,
            y: ev.center.y,
          });
        });

        // Prevent moving the page on some devices when panning over SVG
        options.svgElement.addEventListener('touchmove', function (e) {
          e.preventDefault();
        });
      },

      destroy: function () {
        this.hammer.destroy();
      },
    };

    window.zoomTiger = svgPanZoom('#map', {
      zoomEnabled: true,
      controlIconsEnabled: false,
      fit: true,
      center: true,
      customEventsHandler: eventsHandler,
    });

    const allCeils = document.querySelectorAll('.mapCeil');

    allCeils.forEach((ceil) => {
      ceil.addEventListener(
        'touchstart',
        (e) => clickHandler(e, allCeils),
        false,
      );
    });

    // containerRef.current?.addEventListener(
    //   'touchstart',
    //   (e) => clickOutsideHandler(e, allCeils),
    //   false,
    // );
  }, []);

  const formatCount = (count: number) => {
    return declOfNum(count, ['дерево', 'дерева', 'деревьев']);
  };

  return (
    <Styled.Container ref={containerRef}>
      {mapType === 'firstMap' && <Map />}
      {selected && (
        <Styled.Selected>
          Осталось {selected.available} {formatCount(selected.available)}
        </Styled.Selected>
      )}
    </Styled.Container>
  );
};
