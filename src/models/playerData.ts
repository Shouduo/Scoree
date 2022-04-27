import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { find, findIndex, forEach } from 'lodash';
import { arrayMoveImmutable } from 'array-move';
import { INITIAL_PLAYER_DATA } from '@/utils/constant';
import { playerGenerator } from '@/utils/public';
import * as ls from 'local-storage';
import undoable from 'redux-undo';

export const playerData = createSlice({
  name: 'playerData',
  initialState: JSON.parse(ls.get('SCOREE_PLAYERDATA')) ?? INITIAL_PLAYER_DATA,
  reducers: {
    addPlayer: (state, action) => {
      const { side } = action.payload;
      const newPlayer = playerGenerator(state[`${side}Players`].length + 1);
      state[`${side}Players`].push(newPlayer);
    },
    updatePlayer: (state, action) => {
      forEach(state, (players, key) => {
        const targetIndex = findIndex(players, { index: action.payload.index });
        if (targetIndex > -1) {
          players[targetIndex] = action.payload;
        }
      });
    },
    sortPlayer: (state, action) => {
      const { side, oldIndex, newIndex } = action.payload;
      if (oldIndex !== newIndex) {
        const newData = arrayMoveImmutable(
          [...state[`${side}Players`]],
          oldIndex,
          newIndex
        ).filter((el) => !!el);
        state[`${side}Players`] = newData;
      }
    },
    resetPlayer: (state) => {
      Object.assign(state, INITIAL_PLAYER_DATA);
    },
  },
});

export const { addPlayer, updatePlayer, sortPlayer, resetPlayer } =
  playerData.actions;

export default playerData.reducer;
