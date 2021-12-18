import { ev, incAtkSpd, incDmg, incHp, movAtk } from './bless-list';
import { cmrShk, lghtOff, decDmg, rndAtk, movRev } from './curse-list';

const blesses = [ev, incAtkSpd, incDmg, incHp, movAtk];
const curses = [cmrShk, lghtOff, decDmg, rndAtk, movRev];

export { blesses, curses };
