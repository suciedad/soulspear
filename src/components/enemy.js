import { GameObjects } from 'phaser';

export const ENEMY_EVENTS = {
  DAMAGED: 'damaged',
  KILLED: 'killed',
};

export const ENEMY_STATE = {
  ALIVE: 'alive',
  DEAD: 'dead',
};

export class Enemy extends GameObjects.Container {
  constructor(scene, maxHP, currentHP, reward) {
    super(scene);

    this.maxHP = maxHP;
    this.currentHP = currentHP;
    this.reward = reward;
    this.state = ENEMY_STATE.ALIVE;
  }

  damage(value) {
    if (this.isAlive()) {
      const newHP = this.currentHP - value;

      this.currentHP = newHP >= 0 ? newHP : 0;

      this.emit(ENEMY_EVENTS.DAMAGED, { target: this, damage: value });

      if (this.currentHP === 0) {
        this.state = ENEMY_STATE.DEAD;

        this.emit(ENEMY_EVENTS.KILLED, { target: this, damage: value });
      }
    }
  }

  isAlive() {
    return this.state === ENEMY_STATE.ALIVE;
  }

  isDead() {
    return this.state === ENEMY_STATE.DEAD;
  }
}
