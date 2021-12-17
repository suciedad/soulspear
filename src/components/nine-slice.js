import { GameObjects, Display } from 'phaser';

export class NineSlice extends GameObjects.Container {
  constructor(scene, x, y, width, height, sprites) {
    super(scene, x, y);

    this.scene = scene;

    this.setSize(width, height);

    // Helper zone for align
    this.nineSliceZone = scene.add.zone(0, 0, width, height);

    this.add(this.nineSliceZone);

    this.addCorners(sprites);
    this.addBorders(sprites, width, height);
    this.addBackground(sprites, width, height);

    scene.add.existing(this);
  }

  addCorners(sprites) {
    const { topLeft, topRight, bottomLeft, bottomRight } = sprites;

    this.topLeftSprite = this.scene.add.sprite(0, 0, topLeft);
    this.topRightSprite = this.scene.add.sprite(0, 0, topRight);
    this.bottomLeftSprite = this.scene.add.sprite(0, 0, bottomLeft);
    this.bottomRightSprite = this.scene.add.sprite(0, 0, bottomRight);

    this.add([
      this.topLeftSprite,
      this.topRightSprite,
      this.bottomLeftSprite,
      this.bottomRightSprite,
    ]);

    Display.Align.In.TopLeft(this.topLeftSprite, this.nineSliceZone);
    Display.Align.In.TopRight(this.topRightSprite, this.nineSliceZone);
    Display.Align.In.BottomLeft(this.bottomLeftSprite, this.nineSliceZone);
    Display.Align.In.BottomRight(this.bottomRightSprite, this.nineSliceZone);
  }

  addBorders(sprites, width, height) {
    const { top, bottom, left, right } = sprites;

    const offsetX = this.topLeftSprite.width;
    const offsetY = this.topLeftSprite.height;

    this.top = this.scene.add.tileSprite(
      0,
      0,
      width - offsetX * 2,
      offsetY,
      top,
    );
    this.bottom = this.scene.add.tileSprite(
      0,
      0,
      width - offsetX * 2,
      offsetY,
      bottom,
    );
    this.left = this.scene.add.tileSprite(
      0,
      0,
      offsetX,
      height - offsetY * 2,
      left,
    );
    this.right = this.scene.add.tileSprite(
      0,
      0,
      offsetX,
      height - offsetY * 2,
      right,
    );

    this.add([this.top, this.bottom, this.left, this.right]);

    Display.Align.In.TopCenter(this.top, this.nineSliceZone);
    Display.Align.In.BottomCenter(this.bottom, this.nineSliceZone);
    Display.Align.In.LeftCenter(this.left, this.nineSliceZone);
    Display.Align.In.RightCenter(this.right, this.nineSliceZone);
  }

  addBackground(sprites, width, height) {
    const { bg } = sprites;

    const offsetX = this.topLeftSprite.width;
    const offsetY = this.topLeftSprite.height;

    const bgWidth =
      width - offsetX * 2 + (Number.isInteger(this.left.x) ? 0 : 1);
    const bgHeight =
      height - offsetY * 2 + (Number.isInteger(this.top.y) ? 0 : 1);

    this.bg = this.scene.add.tileSprite(0, 0, bgWidth, bgHeight, bg);

    this.add(this.bg);

    Display.Align.In.Center(this.bg, this.nineSliceZone);
  }
}
