import { configureStore } from '@reduxjs/toolkit';
import * as ls from 'local-storage';
import gameDataReduces from './gameData';
import playerDataReduces from './playerData';
import settingDataReduces from './settingData';

const store = configureStore({
  reducer: {
    gameData: gameDataReduces,
    playerData: playerDataReduces,
    settingData: settingDataReduces,
  },
});

const unsubscribe = store.subscribe(() => {
  // console.log('store.subscribe');
  ls.set('SCOREE_PLAYERDATA', JSON.stringify(store.getState().playerData));
  ls.set('SCOREE_GAMEDATA', JSON.stringify(store.getState().gameData));
  ls.set('SCOREE_SETTINGDATA', JSON.stringify(store.getState().settingData));
});

export default store;
