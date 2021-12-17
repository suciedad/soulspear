import { GUI } from 'dat.gui';

import { PLAYER } from '../constants/game';

export const addDatGui = () => {
  const datgui = new GUI();

  const playerFolder = datgui.addFolder('Player');
  playerFolder.add(PLAYER, 'VELOCITY_X', 1, 300, 1);
  playerFolder.add(PLAYER, 'VELOCITY_Y', 1, 300, 1);
  playerFolder.add(PLAYER, 'VELOCITY_POINTER', 1, 300, 1);
  playerFolder.open();

  const folders = [playerFolder];

  return [datgui, folders];
};
