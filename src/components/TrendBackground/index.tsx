import React from 'react';
import { useSelector } from 'react-redux';
import ColorThief from 'colorthief';
import { sumBy } from 'lodash';
import * as colors from '@ant-design/colors';

const TrendBackground = () => {
  const playerData = useSelector((state) => state.playerData);
  const { leftTeam, rightTeam } = useSelector((state) => state.gameData);

  const [homeRatio, setHomeRatio] = React.useState(0.5);
  const [leftColor, setLeftColor] = React.useState(colors.red[5]);
  const [rightColor, setRightColor] = React.useState(colors.blue[5]);

  React.useEffect(() => {
    const LogoParse = async (url: string) => {
      try {
        const img = document.createElement('img');
        await new Promise((resolve, reject) => {
          img.src = url;
          img.onload = resolve;
        });
        const colorthief = new ColorThief();
        const colorInRgb = await colorthief.getColor(img);
        return colorInRgb;
      } catch (err) {
        return null;
      }
    };

    (async () => {
      setLeftColor(
        leftTeam.logo ? `rgb(${await LogoParse(leftTeam.logo)})` : colors.red[5]
      );
      setRightColor(
        rightTeam.logo
          ? `rgb(${await LogoParse(rightTeam.logo)})`
          : colors.blue[5]
      );
    })();
  }, [leftTeam.logo, rightTeam.logo]);

  React.useEffect(() => {
    const leftScore = sumBy(playerData.leftPlayers, 'score');
    const rightScore = sumBy(playerData.rightPlayers, 'score');
    if (leftScore + rightScore !== 0) {
      const newHomeRatio = leftScore / (leftScore + rightScore);
      setHomeRatio(newHomeRatio);
    } else {
      setHomeRatio(0.5);
    }
  }, [playerData]);

  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: rightColor,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `calc(25% + (${homeRatio} * 50%))`,
          transition: 'width 0.5s ease',
          backgroundColor: leftColor,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '0 0 0 0',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
        }}
      />
    </div>
  );
};

export default TrendBackground;
