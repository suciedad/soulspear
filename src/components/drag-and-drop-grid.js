import { Actions, GameObjects, Utils } from 'phaser';

// TODO: add stackable/not-stackable behavior
export class DragAndDropGrid extends GameObjects.Container {
  constructor(scene, x, y, size, qty) {
    super(scene, x, y);

    this.scene = scene;
    this.size = size;
    this.dropZones = [];
    this.dragItems = [];

    for (let i = 0; i < qty; i += 1) {
      const zone = scene.add
        .zone(0, 0, size, size)
        .setRectangleDropZone(size, size);

      this.dropZones.push(zone);
      this.add(zone);
    }

    console.log(this);

    Actions.GridAlign(this.dropZones, {
      cellWidth: size + 10,
      cellHeight: size + 10,
      x: 0,
      y: 0,
      position: 6,
      width: 5,
      height: 2,
    });

    const graphics = scene.add.graphics().lineStyle(2, 0xffff00);

    Utils.Array.Each(this.dropZones, (zone) => {
      graphics.strokeRect(
        zone.x - zone.input.hitArea.width / 2 + x,
        zone.y - zone.input.hitArea.height / 2 + y,
        zone.input.hitArea.width,
        zone.input.hitArea.height,
      );
    });

    // Items inside container for test
    // for (let i = 0; i < qty; i += 1) {
    //   const testItem = this.createTestItem(scene, size, true);

    //   scene.input.setDraggable(testItem);
    //   this.dragItems.push(testItem);
    //   this.add(testItem);
    // }

    // Actions.GridAlign(this.dragItems, {
    //   cellWidth: size + 10,
    //   cellHeight: size + 10,
    //   x: 0,
    //   y: -100,
    //   position: 6,
    //   width: -1,
    // });

    scene.input.on('drag', this.handleDrag.bind(this));
    scene.input.on('drop', this.handleDrop.bind(this));
    scene.input.on('dragend', this.handleDragEnd.bind(this));

    scene.add.existing(this);
  }

  handleDrag(pointer, gameObject, dragX, dragY) {
    if (this.isItemFromList(gameObject)) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    }
  }

  handleDrop(pointer, gameObject, dropZone) {
    if (this.isItemFromList(gameObject)) {
      if (this.isThisDropZone(dropZone)) {
        // transformMatrix method
        // https://www.html5gamedevs.com/topic/38403-absolute-position-of-sprite/
        gameObject.x = dropZone.x + dropZone.parentContainer.x;
        gameObject.y = dropZone.y + dropZone.parentContainer.y;

        gameObject.input.enabled = false;
      } else {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    }
  }

  handleDragEnd(pointer, gameObject, dropped) {
    if (this.isItemFromList(gameObject)) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    }
  }

  createTestItem(scene, size, interactive) {
    scene.add
      .graphics()
      .fillStyle(0x0000ff, 1)
      .fillRect(0, 0, size, size)
      .generateTexture('test-dnd-item', size, size)
      .destroy();

    const item = scene.add.image(0, 0, 'test-dnd-item');

    interactive && item.setInteractive({ useHandCursor: true });

    return item;
  }

  setItems(items) {
    this.dragItems = items;

    items.forEach((item) => {
      this.scene.input.setDraggable(item);
      this.dragItems.push(item);
    });
  }

  isItemFromList(item) {
    return Boolean(this.dragItems.find((listItem) => listItem === item));
  }

  isThisDropZone(zone) {
    return Boolean(this.dropZones.find((dropZone) => dropZone === zone));
  }
}
