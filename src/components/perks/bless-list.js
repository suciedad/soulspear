import { Perk, PERK_TYPE } from './perk';

const incDmg = new Perk(
  'inc-dmg',
  'Increase damage',
  'Get it!',
  'Increase Hero damage x2',
  PERK_TYPE.BLESS,
  20,
);

const incAtkSpd = new Perk(
  'inc-atk-spd',
  'Increase attack speed',
  'Fastest hand on Wild West',
  'Increase Hero attack speed x2',
  PERK_TYPE.BLESS,
  20,
);

const movAtk = new Perk(
  'mov-atk',
  "Movement don't stop attacking",
  'funny subtitle',
  "Movement don't stop attacking",
  PERK_TYPE.BLESS,
  10,
);

const incHp = new Perk(
  'inc-hp',
  'Increase HP',
  'funny subtitle',
  '+50 to Hero HP',
  PERK_TYPE.BLESS,
  20,
);

const ev = new Perk(
  'ev',
  'Evasion',
  'funny subtitle',
  '10% chance to avoid enemy attack',
  PERK_TYPE.BLESS,
  10,
);

export { incDmg, incAtkSpd, movAtk, incHp, ev };
