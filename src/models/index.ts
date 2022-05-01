import { configureStore } from '@reduxjs/toolkit';
import * as ls from 'local-storage';
import undoable from 'redux-undo';
import gameDataReduces from './gameData';
import playerDataReduces from './playerData';
import settingDataReduces from './settingData';

const store = configureStore({
  reducer: {
    gameData: gameDataReduces,
    // playerData: undoable(playerDataReduces),
    playerData: undoable(playerDataReduces),
    settingData: settingDataReduces,
  },
});

const unsubscribe = store.subscribe(() => {
  // console.log('store.subscribe');
  ls.set(
    'SCOREE_PLAYERDATA',
    JSON.stringify(store.getState().playerData.present)
  );
  ls.set('SCOREE_GAMEDATA', JSON.stringify(store.getState().gameData));
  ls.set('SCOREE_SETTINGDATA', JSON.stringify(store.getState().settingData));
});

export default store;

const temp = {
  past: [
    {
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
    },
    {
      leftPlayers: [
        {
          name: 'Player 1',
          number: 1,
          foul: 0,
          score: 1,
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
    },
    {
      leftPlayers: [
        {
          name: 'Player 1',
          number: 1,
          foul: 0,
          score: 2,
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
    },
    {
      leftPlayers: [
        {
          name: 'Player 1',
          number: 1,
          foul: 0,
          score: 3,
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
    },
  ],
  present: {
    leftPlayers: [
      {
        name: 'Player 1',
        number: 1,
        foul: 0,
        score: 4,
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
  },
  future: [],
  group: null,
  _latestUnfiltered: {
    leftPlayers: [
      {
        name: 'Player 1',
        number: 1,
        foul: 0,
        score: 4,
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
  },
  index: 4,
  limit: 5,
};
