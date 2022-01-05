import { Math, Scene } from 'phaser';
import { AttackingUnit } from '../components/attacking-unit';
import { Bullet } from '../components/bullet';
import { PerksManager } from '../components/perks/perks-manager';
import { PlayerHero } from '../components/player';
import { Unit } from '../components/unit';

import { APP_SIZE } from '../constants/app';
import {
  ENEMY_DIAGONAL,
  PERKS_ABILITIES,
  PLAYER,
  TEST_PERKS,
} from '../constants/game';
import { SCENE_KEY } from '../constants/scene-key';
import { HP_EVENTS } from '../mixins/hp-mixin';

// Player

// VINCIBLE
// INVINCIBLE
// STANDING
// WALKING
// ATTACKING

// Enemy Group

// ONE_KILLED -> who
// ALL_KILLED

const ENEMIES_EVENT = {
  ONE_KILLED: 'one-killed',
  ALL_KILLED: 'all-killed',
};

export class DemoGameScene extends Scene {
  constructor() {
    super({ key: SCENE_KEY.DEMO_GAME_SCENE });
  }

  create() {
    this.createMap(false);
    this.createEnemies();
    this.createPlayer();

    this.physics.add.collider(
      this.player.hitZone,
      this.enemies.getChildren().map((item) => item.hitZone),
      () => {
        this.player.takeDamage(1);
      },
    );

    this.player.on(HP_EVENTS.KILLED, () => console.log('GAME OVER'));

    this.playerBullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });

    this.pointer = this.input.activePointer;

    const asdf = new PerksManager();
    console.log((window.perks = asdf));

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
    this.player.body.setVelocity(0);

    if (this.pointer.isDown) {
      this.movePlayerByPointer();
    } else {
      if (this.isAnyEnemyAlive()) {
        this.autoFire(time, this.getClosestEnemy());
      }
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

  autoFire(time, target) {
    if (time - this.lastFired > PLAYER.ATTACK_SPEED) {
      this.lastFired = time;

      var bullet = this.playerBullets.get().setActive(true).setVisible(true);

      if (bullet && target) {
        bullet.fire(this.player, target);

        this.physics.add.collider(
          this.enemies.getChildren().map((item) => item.hitZone),
          bullet,
          (target, bullet) => {
            bullet.destroy();
            target.parentContainer.takeDamage(
              TEST_PERKS.BLESS['Increase damage'] ? PLAYER.ATK * 4 : PLAYER.ATK,
            );
          },
        );
      }
    }
  }

  getClosestEnemy() {
    const enemies = this.enemies.getChildren();
    const closest = enemies.reduce((acc, curr) => {
      const currMinDistance = Math.Distance.BetweenPoints(this.player, acc);
      const distance = Math.Distance.BetweenPoints(this.player, curr);

      return distance < currMinDistance ? curr : acc;
    });

    return closest;
  }

  createEnemies() {
    this.enemies = this.add.group();

    const ENEMIES_COUNT = 3;

    for (let i = 0; i < ENEMIES_COUNT; i += 1) {
      const enemy = new Unit(this);

      this.physics.world.enable(enemy);

      enemy.body
        .setVelocity(ENEMY_DIAGONAL.MOVEMENT_SPEED)
        .setBounce(1, 1)
        .setCollideWorldBounds(true);
      this.physics.add.collider(enemy, this.walls);

      enemy.on(HP_EVENTS.KILLED, () => {
        enemy.destroy();
        this.enemies.emit(ENEMIES_EVENT.ONE_KILLED);

        if (this.isLastEnemyKilled()) {
          this.enemies.emit(ENEMIES_EVENT.ALL_KILLED);
        }
      });

      this.enemies.add(enemy);
    }

    for (let i = 0; i < ENEMIES_COUNT; i += 1) {
      const enemy = new AttackingUnit(this);

      this.physics.world.enable(enemy);

      enemy.body.setBounce(1, 1).setCollideWorldBounds(true);
      this.physics.add.collider(enemy, this.walls);

      enemy.on(HP_EVENTS.KILLED, () => {
        enemy.destroy();
        this.enemies.emit(ENEMIES_EVENT.ONE_KILLED);

        if (this.isLastEnemyKilled()) {
          this.enemies.emit(ENEMIES_EVENT.ALL_KILLED);
        }
      });

      this.enemies.add(enemy);
    }

    this.enemies.on(ENEMIES_EVENT.ALL_KILLED, () => {
      console.log('All enemies killed');
    });
  }

  isLastEnemyKilled() {
    return this.enemies.getTotalUsed() === 0;
  }

  isAnyEnemyAlive() {
    return this.enemies.getChildren().length > 0;
  }

  createPlayer() {
    this.player = new PlayerHero(
      this,
      APP_SIZE.WIDTH * 0.5,
      APP_SIZE.HEIGHT * 0.5 + 150,
    );

    this.physics.world.enable(this.player);
    this.physics.add.collider(this.player, this.walls);
  }

  createMap(debug) {
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon_tileset', 'dungeon-tiles');

    this.floor = map.createStaticLayer('Floor', tileset, 0, 0).setScale(2.5);
    this.walls = map.createStaticLayer('Walls', tileset, 0, 0).setScale(2.5);

    this.walls.setCollisionByProperty({ collides: true });

    if (debug) {
      const debugGr = this.add.graphics().setAlpha(0.7);
      this.walls.renderDebug(debugGr, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(255, 10, 10, 255),
        faceColor: new Phaser.Display.Color(10, 255, 10, 255),
      });
    }
  }
}
