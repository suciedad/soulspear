import { Actions, Scene } from 'phaser';
import { Button } from '../components/button';
import { DragAndDropGrid } from '../components/drag-and-drop-grid';
import { PLACEMENT, Tooltip } from '../components/tooltip';
import { APP_SIZE } from '../constants/app';
import { SCENE_KEY } from '../constants/scene-key';
import { MAIN } from '../locales/main';

const TEXT_STYLE = {
  fill: '#380e00',
  fontSize: '18px',
  fontFamily: "'Press Start 2P', cursive",
};

const BUTTON_SIZE = {
  WIDTH: 255,
  HEIGHT: 70,
};

export class MainMenu extends Scene {
  constructor() {
    super({ key: SCENE_KEY.MAIN_MENU });

    this.buttons = {
      start: null,
      selectLevel: null,
      options: null,
    };

    this.logo = null;
  }

  preload() {}

  create() {
    const nineSliceSprites = {
      topLeft: 'top-left',
      topRight: 'top-right',
      bottomLeft: 'bottom-left',
      bottomRight: 'bottom-right',
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right',
      bg: 'bg',
    };

    this.buttons.start = new Button(
      this,
      0,
      0,
      BUTTON_SIZE.WIDTH,
      BUTTON_SIZE.HEIGHT,
      MAIN.START_GAME.toUpperCase(),
      TEXT_STYLE,
      'main-menu-button',
      this.startClickHandler.bind(this),
    );

    this.buttons.selectLevel = new Button(
      this,
      0,
      0,
      BUTTON_SIZE.WIDTH,
      BUTTON_SIZE.HEIGHT,
      MAIN.SELECT_LEVEL,
      {
        fontSize: 22,
        fill: '#fff',
        fontFamily: 'Arial',
        stroke: '#29366f',
        strokeThickness: 8,
      },
      nineSliceSprites,
      this.selectLevelHandler,
    );

    this.buttons.options = new Button(
      this,
      0,
      0,
      BUTTON_SIZE.WIDTH,
      BUTTON_SIZE.HEIGHT,
      MAIN.OPTIONS,
      null,
      null,
      this.optionsClickHandler,
    );

    this.tooltipButton = new Button(
      this,
      APP_SIZE.WIDTH - 250,
      APP_SIZE.HEIGHT - 200,
      100,
      40,
      MAIN.TOOLTIP_BUTTON_TEXT,
    );

    this.bottomTooltip = new Tooltip(
      this,
      this.tooltipButton,
      150,
      70,
      nineSliceSprites,
      PLACEMENT.BOTTOM_LEFT,
      20,
    );

    this.rightTooltip = new Tooltip(
      this,
      this.tooltipButton,
      100,
      100,
      nineSliceSprites,
      PLACEMENT.RIGHT_BOTTOM,
      30,
    );

    this.topTooltip = new Tooltip(
      this,
      this.tooltipButton,
      30,
      50,
      nineSliceSprites,
      PLACEMENT.TOP_CENTER,
    );

    this.input.setDraggable(this.tooltipButton);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.goodItems = [];
    this.badItems = [];

    for (let i = 0; i < 2; i += 1) {
      const item = this.createTestDragItem(40, true, 0x0000ff);

      this.input.setDraggable(item);
      this.goodItems.push(item);
    }

    for (let i = 0; i < 2; i += 1) {
      const item = this.createTestDragItem(40, true, 0xff0000);

      this.input.setDraggable(item);
      this.badItems.push(item);
    }

    Actions.GridAlign([...this.goodItems, ...this.badItems], {
      cellWidth: 35 + 10,
      cellHeight: 35 + 10,
      x: 50,
      y: 50,
      position: 6,
      width: -1,
    });

    this.topDragGrid = new DragAndDropGrid(this, 150, 150, 40, 5).setItems(
      this.goodItems,
    );
    this.bottomDragGrid = new DragAndDropGrid(this, 150, 215, 40, 5).setItems(
      this.badItems,
    );

    Actions.GridAlign(
      [this.buttons.start, this.buttons.selectLevel, this.buttons.options],
      {
        x: APP_SIZE.WIDTH * 0.5,
        y: 300,
        height: -1,
        cellHeight: BUTTON_SIZE.HEIGHT + 40,
        position: 6,
      },
    );
  }

  startClickHandler() {
    console.log('Start Game!');
    this.scene.start(SCENE_KEY.DEMO_GAME_SCENE);
  }

  selectLevelHandler() {
    console.log('Select Level!');
  }

  optionsClickHandler() {
    console.log('Open Options!');
  }

  createTestDragItem(size, interactive, color) {
    const spriteName = 'test-dnd-item' + Math.random();

    this.add
      .graphics()
      .fillStyle(color, 1)
      .fillRect(0, 0, size, size)
      .generateTexture(spriteName, size, size)
      .destroy();

    const item = this.add.image(0, 0, spriteName);

    interactive && item.setInteractive({ useHandCursor: true });

    return item;
  }
}
