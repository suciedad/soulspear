import { ProgressBar } from '../components/progress-bar';
import { HP_EVENTS } from './hp-mixin';

export const HpBarMixin = (style) => (superclass) =>
  class extends superclass {
    constructor(...args) {
      super(...args);

      this.checkHpMixin();

      this.hpBar = new ProgressBar(
        this.scene,
        0,
        0,
        0,
        this.maxHp,
        this.currentHp,
        style,
      );

      this.on(HP_EVENTS.TAKE_DAMAGE, ({ postHp }) => {
        this.hpBar.setValue(postHp);
      });
    }

    setHpBarPosition(x, y) {
      this.hpBar.setPosition(x, y);
    }

    checkHpMixin() {
      if (this.maxHp === undefined && this.currentHp === undefined) {
        console.warn(
          Error('There is no maxHp or currentHp. Maybe HpMixin not included?'),
        );
      }
    }
  };
