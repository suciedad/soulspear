import { GameObjects } from 'phaser';
import { hpBarStyle } from '../constants/ui';
import { composeMixins, HpMixin, HpBarMixin } from '../mixins';

const Base = composeMixins(
  HpMixin(100, 100),
  HpBarMixin(hpBarStyle),
)(GameObjects.Container);

export class PlayerHero extends Base {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.unitSprite = new GameObjects.Image(scene, 0, 0, 'blue-player');

    this.hitZone = new GameObjects.Zone(
      scene,
      0,
      0,
      this.unitSprite.width,
      this.unitSprite.height,
    ).setInteractive();

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
