import { GUI } from 'dat.gui';

import {
  ENEMY_DIAGONAL,
  PERKS_ABILITIES,
  PLAYER,
  TEST_PERKS,
} from '../constants/game';

export const addDatGui = () => {
  const datgui = new GUI({ width: 300 });

  const playerFolder = datgui.addFolder('Player');
  playerFolder.add(PLAYER, 'VELOCITY_POINTER', 1, 300, 1);
  playerFolder.add(PLAYER, 'ATTACK_SPEED', 50, 1000, 10);
  playerFolder.add(PLAYER, 'PROJECTILE_SPEED', 0.1, 1, 0.05);
  playerFolder.open();

  const enemyFolder = datgui.addFolder('Enemy');
  enemyFolder.add(ENEMY_DIAGONAL, 'MOVEMENT_SPEED', 1, 300, 1);
  enemyFolder.open();

  const perksFolder = datgui.addFolder('Perks');
  const perksAbilitiesFolder = perksFolder.addFolder('Perks abilities');
  perksAbilitiesFolder.add(
    PERKS_ABILITIES,
    'CAMERA_SHAKING_INTENSITY',
    0.005,
    0.05,
    0.001,
  );
  perksAbilitiesFolder.add(PERKS_ABILITIES, 'LIGHT_OFF_OPACITY', 0, 1, 0.01);
  const blessesFolder = perksFolder.addFolder('Bless');
  Object.keys(TEST_PERKS.BLESS).forEach((key) => {
    blessesFolder.add(TEST_PERKS.BLESS, key);
  });
  const cursesFolder = perksFolder.addFolder('Curse');
  Object.keys(TEST_PERKS.CURSE).forEach((key) => {
    cursesFolder.add(TEST_PERKS.CURSE, key);
  });
  perksAbilitiesFolder.open();
  cursesFolder.open();
  blessesFolder.open();
  // perksFolder.open();

  const folders = [
    playerFolder,
    enemyFolder,
    perksFolder,
    perksAbilitiesFolder,
    blessesFolder,
    cursesFolder,
  ];

  return [datgui, folders];
};
