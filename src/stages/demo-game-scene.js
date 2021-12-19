import { Scene } from 'phaser';
import { Bullet } from '../components/bullet';
import { PerksManager } from '../components/perks/perks-manager';

import { APP_SIZE } from '../constants/app';
import {
  ENEMY_DIAGONAL,
  PERKS_ABILITIES,
  PLAYER,
  TEST_PERKS,
} from '../constants/game';
import { SCENE_KEY } from '../constants/scene-key';

/**
 * BLESS
 * 1) Increase damage
 * 2) Increase attack speed
 * 3) Movement don't stop attacking
 * 4) Increase HP
 * 5) Evasion
 */

/**
 * CURSE
 * 1) Camera shaking
 * 2) Turn off light
 * 3) Decrease damage
 * 4) Random attacking
 * 5) Movement control reversed
 */

export class DemoGameScene extends Scene {
  constructor() {
    super({ key: SCENE_KEY.DEMO_GAME_SCENE });
  }

  create() {
    this.player = this.physics.add.sprite(
      APP_SIZE.WIDTH * 0.5,
      APP_SIZE.HEIGHT * 0.5,
      'blue-player',
    );
    this.player.setCollideWorldBounds(true);

    this.enemy = this.physics.add.sprite(100, 200, 'red-player');
    this.enemy
      .setVelocity(ENEMY_DIAGONAL.MOVEMENT_SPEED)
      .setBounce(1, 1)
      .setCollideWorldBounds(true);

    this.playerBullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });

    this.pointer = this.input.activePointer;

    const asdf = new PerksManager();
    console.log((window.asdf = asdf));

    // +100px to hide borders on camera shaking
    const gr = this.add.graphics();
    gr.fillStyle(0x000000, 1)
      .fillRect(0, 0, APP_SIZE.WIDTH + 100, APP_SIZE.HEIGHT + 100)
      .generateTexture('light-off', APP_SIZE.WIDTH + 100, APP_SIZE.HEIGHT + 100)
      .destroy();
    this.darken = this.add
      .image(APP_SIZE.WIDTH * 0.5, APP_SIZE.HEIGHT * 0.5, 'light-off')
      .setAlpha(PERKS_ABILITIES.LIGHT_OFF_OPACITY);

    this.lastFired = 0;
  }

  update(time) {
    this.player.setVelocity(0);

    if (this.pointer.isDown) {
      this.movePlayerByPointer();
    } else {
      this.autoFire(time);
    }

    this.darken.setVisible(TEST_PERKS.CURSE['Turn off light']);
    this.darken.setAlpha(PERKS_ABILITIES.LIGHT_OFF_OPACITY);
    TEST_PERKS.CURSE['Camera shaking'] &&
      this.cameras.main.shake(50, PERKS_ABILITIES.CAMERA_SHAKING_INTENSITY);
  }

  movePlayerByPointer() {
    this.physics.moveToObject(
      this.player,
      this.pointer,
      PLAYER.VELOCITY_POINTER,
    );

    this.player.flipX = this.player.body.velocity.x < 0;
  }

  autoFire(time) {
    if (time - this.lastFired > PLAYER.ATTACK_SPEED) {
      this.lastFired = time;

      var bullet = this.playerBullets.get().setActive(true).setVisible(true);

      if (bullet) {
        bullet.fire(this.player, this.enemy);
        // Add collider between bullet and player
        // this.physics.add.collider(this.enemy, bullet, () =>
        //   console.log('enemy hited'),
        // );
      }
    }
  }
}
