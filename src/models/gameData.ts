import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { find, findIndex, forEach } from 'lodash';
import { arrayMoveImmutable } from 'array-move';
import { INITIAL_GAME_DATA } from '@/utils/constant';
import * as ls from 'local-storage';
import undoable from 'redux-undo';

export const gameData = createSlice({
  name: 'gameData',
  initialState: JSON.parse(ls.get('SCOREE_GAMEDATA')) ?? INITIAL_GAME_DATA,
  reducers: {
    updateGame: (state, action) => {
      forEach(action.payload, (value, key) => {
        state[key] = value;
      });
    },
    // updateGame: undoable((state, action) => {
    //   // forEach(action.payload, (value, key) => {
    //   //   state[key] = value;
    //   // });
    //   return { ...state, ...action.payload };
    // }),
    resetGame: (state, action) => {
      Object.assign(state, { ...INITIAL_GAME_DATA, ...action.payload });
    },
    // resetGame: undoable((state, action) => {
    //   Object.assign(state, { ...INITIAL_GAME_DATA, ...action.payload });
    //   return { ...state, ...{ ...INITIAL_GAME_DATA, ...action.payload } };
    // }),
  },
});

export const { updateGame, resetGame } = gameData.actions;

export default gameData.reducer;
