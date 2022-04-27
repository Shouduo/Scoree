export const QUATER_ARRAY = [
  '1ST',
  '2ND',
  '3RD',
  '4TH',
  '5TH',
  '6TH',
  '7TH',
  '8TH',
  'OT',
  'OT2',
  'OT3',
  'OT4',
];

export const PLAYER_TEMPLATE = {
  name: 'Player 1',
  number: 1,
  foul: 0,
  score: 0,
  index: 'EKJzqVlKFNonsrHeoEY8F',
};

export const INITIAL_SETTING_DATA = {
  offenceDuration: 24 * 1000,
  quaterDuration: 12 * 60 * 1000,
  quaterCount: 4,
  clockBuzzer: true,
};

export const INITIAL_PLAYER_DATA = {
  leftPlayers: [
    {
      name: 'Player 1',
      number: 1,
      foul: 0,
      score: 0,
      index: 'EKJzqVlKFNonsrHeoEY8G',
    },
    {
      name: 'Player 2',
      number: 2,
      foul: 0,
      score: 0,
      index: 'EKJzqVlKFNonsrHeoEY8H',
    },
    {
      name: 'Player 3',
      number: 3,
      foul: 0,
      score: 0,
      index: 'EKJzqVlKFNonsrHeoEY8I',
    },
  ],
  rightPlayers: [
    {
      name: 'Player 1',
      number: 1,
      foul: 0,
      score: 0,
      index: 'EKJzqVlKFNonsrHeoEY8J',
    },
    {
      name: 'Player 2',
      number: 2,
      foul: 0,
      score: 0,
      index: 'EKJzqVlKFNonsrHeoEY8K',
    },
    {
      name: 'Player 3',
      number: 3,
      foul: 0,
      score: 0,
      index: 'EKJzqVlKFNonsrHeoEY8L',
    },
  ],
};

export const INITIAL_GAME_DATA = {
  quater: '1ST',
  quaterTime: INITIAL_SETTING_DATA.quaterDuration,
  offenceTime: INITIAL_SETTING_DATA.offenceDuration,
  leftTeam: {
    name: 'HOME',
    logo: '',
    timeOut: 0,
    foul: 0,
  },
  rightTeam: {
    name: 'AWAY',
    logo: '',
    timeOut: 0,
    foul: 0,
  },
};
