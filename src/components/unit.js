import { GameObjects, Math } from 'phaser';
import { HpMixin } from '../mixins/hp-mixin';
import { HpBarMixin } from '../mixins/hp-bar-mixin';
import { composeMixins } from '../mixins/utils';
import { ProgressBar } from './progress-bar';
import { RewardMixin } from '../mixins';
import { APP_SIZE } from '../constants/app';

const hpBarStyle = {
  bgColor: 0x555555,
  barColor: 0x00ff00,
  width: 50,
  height: 7,
  padding: 2,
  borderRadius: 0,
};

const Base = composeMixins(
  HpMixin(25, 25),
  HpBarMixin(hpBarStyle),
  RewardMixin({ shards: 7 }),
)(GameObjects.Container);

export class Unit extends Base {
  constructor(scene) {
    super(
      scene,
      Math.Between(200, APP_SIZE.WIDTH - 200),
      Math.Between(200, APP_SIZE.HEIGHT - 200),
    );

    this.unitSprite = new GameObjects.Image(scene, 0, 0, 'yellow-player');

    this.hitZone = new GameObjects.Zone(
      scene,
      0,
      0,
      this.unitSprite.width,
      this.unitSprite.height,
    ).setInteractive({ useCursorHand: true });

    const hpBarPositionX = -this.hpBar.width * 0.5;
    const hpBarPositionY =
      -this.unitSprite.height * 0.5 - this.hpBar.height - 10;
    this.setHpBarPosition(hpBarPositionX, hpBarPositionY);

    this.add([this.hpBar, this.unitSprite, this.hitZone]);

    this.setSize(this.unitSprite.width, this.unitSprite.height);

    scene.add.existing(this);
    scene.physics.add.existing(this.hitZone);
  }
}
