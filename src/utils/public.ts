import { PLAYER_TEMPLATE } from '@/utils/constant';
import { nanoid } from 'nanoid';

export const playerGenerator = (count) => {
  return {
    ...PLAYER_TEMPLATE,
    index: nanoid(),
    name: `Player ${count}`,
    number: '#',
  };
};
