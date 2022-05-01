import React, { createElement } from 'react';
import ScoreBoard from '@/components/ScoreBoard';
import TeamLogo from '@/components/TeamLogo';
import TeamInfo from '@/components/TeamInfo';

const Jumbotron = () => {
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
      <ScoreBoard />
      <TeamLogo side="right" />
      <TeamInfo side="right" />
    </div>
  );
};

export default Jumbotron;
