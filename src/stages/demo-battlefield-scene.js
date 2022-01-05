import { Scene } from 'phaser';
import { SCENE_KEY } from '../constants/scene-key';

export class DemoBattlefieldScene extends Scene {
  constructor() {
    super({ key: SCENE_KEY.DEMO_BATTLEFIELD_SCENE });
  }

  create() {
    console.log('Battlefield scene created');

    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon_tileset', 'dungeon-tiles');

    const floor = map.createStaticLayer('Floor', tileset, 0, 0).setScale(2);
    const walls = map.createStaticLayer('Walls', tileset, 0, 0).setScale(2);

    walls.setCollisionByProperty({ collides: true });

    const debugGr = this.add.graphics().setAlpha(0.7);
    walls.renderDebug(debugGr, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(255, 10, 10, 255),
      faceColor: new Phaser.Display.Color(10, 255, 10, 255),
    });

    this.player = this.physics.add
      .sprite(400, 450, 'blue-player')
      .setScale(0.7);

    this.enemy1 = this.physics.add.sprite(200, 150, 'red-player').setScale(0.7);
    this.enemy2 = this.physics.add.sprite(400, 150, 'red-player').setScale(0.7);
    this.enemy3 = this.physics.add.sprite(600, 150, 'red-player').setScale(0.7);

    this.physics.add.collider(this.player, walls);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 90;

    this.player.setVelocityX(0);
    this.player.setVelocityY(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = true;
    }

    if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.flipX = false;
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    }

    if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}
