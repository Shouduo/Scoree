import React, { createElement } from 'react';
import { useSelector } from 'react-redux';
import { sumBy } from 'lodash';
import ScoreBoard from '@/components/ScoreBoard';
import TeamLogo from '@/components/TeamLogo';
import TeamInfo from '@/components/TeamInfo';

const Jumbotron = () => {
  const playerData = useSelector((state) => state.playerData);
  const leftScore = sumBy(playerData.leftPlayers, 'score');
  const rightScore = sumBy(playerData.rightPlayers, 'score');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: '160px',
      }}
    >
      <TeamInfo side="left" />
      <TeamLogo side="left" />
      <ScoreBoard leftScore={leftScore} rightScore={rightScore} />
      <TeamLogo side="right" />
      <TeamInfo side="right" />
    </div>
  );
};

export default Jumbotron;
