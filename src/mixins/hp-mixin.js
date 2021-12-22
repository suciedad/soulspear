export const HP_EVENTS = {
  TAKE_DAMAGE: 'take-damage',
  KILLED: 'killed',
};

export const HpMixin = (maxHp, currentHp) => (superclass) =>
  class extends superclass {
    constructor(...args) {
      super(...args);

      this.maxHp = maxHp;
      this.currentHp = currentHp;
    }

    takeDamage(damage) {
      if (this.currentHp > 0) {
        const newCurrentHp = this.currentHp - damage;

        if (newCurrentHp <= 0) {
          this.emit(HP_EVENTS.TAKE_DAMAGE, {
            damage,
            preHp: this.currentHp,
            postHp: 0,
          });

          this.currentHp = 0;

          this.emit(HP_EVENTS.KILLED, { damage });
        } else {
          this.emit(HP_EVENTS.TAKE_DAMAGE, {
            damage,
            preHp: this.currentHp,
            postHp: newCurrentHp,
          });

          this.currentHp = newCurrentHp;
        }
      }
    }
  };
