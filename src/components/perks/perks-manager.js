import { PERKS } from '../../constants/game';
import { blesses, curses } from './perk-list';

export class PerksManager {
  constructor() {
    this.blesses = blesses;
    this.curses = curses;

    this.selectedBlesses = [];
    this.selectedCurses = [];

    this.randomPerksCount = PERKS.RANDOM_COUNT;
    this.maxSlotCount = PERKS.MAX_SLOT_COUNT;
  }

  getRandomPerk(source, count) {
    const indexes = [];

    for (let index = 0; index < count; index += 1) {
      let idx = Math.floor(Math.random() * source.length);

      while (indexes.includes(idx)) {
        idx = Math.floor(Math.random() * source.length);
      }

      indexes.push(idx);
    }

    return indexes.map((index) => source[index]);
  }

  getRandomBless() {
    return this.getRandomPerk(this.blesses, this.randomPerksCount);
  }

  getRandomCurse() {
    return this.getRandomPerk(this.curses, this.randomPerksCount);
  }

  getRandomPerks() {
    return {
      blesses: this.getRandomBless(),
      curses: this.getRandomCurse(),
    };
  }

  selectPerk(perk) {
    if (perk.isBless()) {
      this.selectedBlesses = [...this.selectedBlesses, perk];
    }

    if (perk.isCurse()) {
      this.selectedCurses = [...this.selectedCurses, perk];
    }
  }
}
