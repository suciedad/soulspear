import { Perk, PERK_TYPE } from './perk';

const cmrShk = new Perk(
  'cmr-shk',
  'Shaker shaker',
  'Party maker',
  'Shake camera',
  PERK_TYPE.CURSE,
  10,
);

const lghtOff = new Perk(
  'lght-off',
  'Lights off',
  'funny subtitle',
  'Turn off light',
  PERK_TYPE.CURSE,
  10,
);

const decDmg = new Perk(
  'dec-dmg',
  'Decrease damage',
  'funny subtitle',
  'Decrease Hero damage',
  PERK_TYPE.CURSE,
  20,
);

const rndAtk = new Perk(
  'rnd-atk',
  'Random attacking',
  'funny subtitle',
  'Hero attack in random direction',
  PERK_TYPE.CURSE,
  10,
);

const movRev = new Perk(
  'mov-rev',
  'Movement control reversed',
  'funny subtitle',
  'Movement control reversed',
  PERK_TYPE.CURSE,
  10,
);

export { cmrShk, lghtOff, decDmg, rndAtk, movRev };
