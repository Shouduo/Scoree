import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { find, findIndex, forEach } from 'lodash';
import { arrayMoveImmutable } from 'array-move';
import { INITIAL_GAME_DATA, INITIAL_SETTING_DATA } from '@/utils/constant';
import * as ls from 'local-storage';

export const settingData = createSlice({
  name: 'settingData',
  initialState:
    JSON.parse(ls.get('SCOREE_SETTINGDATA')) ?? INITIAL_SETTING_DATA,
  reducers: {
    updateSetting: (state, action) => {
      forEach(action.payload, (value, key) => {
        state[key] = value;
      });
    },
    // resetSetting: (state) => {
    //   Object.assign(state, INITIAL_SETTING_DATA);
    // },
  },
});

export const {
  updateSetting,
  // resetSetting
} = settingData.actions;

export default settingData.reducer;
