import { Actions, Scene } from 'phaser';
import {
  DragAndDropGrid,
  DRAG_AND_DROP_GRID_EVENT,
} from '../components/drag-and-drop-grid';
import { NineSlice } from '../components/nine-slice';
import { PerksManager } from '../components/perks/perks-manager';
import { APP_SIZE } from '../constants/app';

const FRAME_PADDING = 200;
const TEST_ICON = {
  SIZE: 75,
  MARGIN: 25,
  BLESS_COLOR: 0x00ff00,
  CURSE_COLOR: 0xff0000,
};

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

export class ChoosePerksScene extends Scene {
  constructor(params) {
    super({ key: 'qwe' });
  }

  create() {
    this.perks = [];

    this.rollPerks();
    this.drawBg();
    this.addPerkIcons();
    this.addPerkSlots();
  }

  rollPerks() {
    const perksManager = new PerksManager();

    this.rolledPerks = perksManager.getRandomPerks();
  }

  drawBg() {
    this.frameBg = new NineSlice(
      this,
      APP_SIZE.WIDTH * 0.5,
      APP_SIZE.HEIGHT * 0.5,
      APP_SIZE.WIDTH - FRAME_PADDING,
      APP_SIZE.HEIGHT - FRAME_PADDING,
      nineSliceSprites,
    );
  }

  addPerkIcons() {
    this.blesses = [
      this.createTestPerkIcon(
        TEST_ICON.SIZE,
        TEST_ICON.BLESS_COLOR,
        this.rolledPerks.blesses[0],
      ),
      this.createTestPerkIcon(
        TEST_ICON.SIZE,
        TEST_ICON.BLESS_COLOR,
        this.rolledPerks.blesses[1],
      ),
    ];
    this.curses = [
      this.createTestPerkIcon(
        TEST_ICON.SIZE,
        TEST_ICON.CURSE_COLOR,
        this.rolledPerks.curses[0],
      ),
      this.createTestPerkIcon(
        TEST_ICON.SIZE,
        TEST_ICON.CURSE_COLOR,
        this.rolledPerks.curses[1],
      ),
    ];

    Actions.GridAlign([...this.blesses, ...this.curses], {
      x: 200,
      y: 200,
      cellWidth: TEST_ICON.SIZE + TEST_ICON.MARGIN,
      cellHeight: TEST_ICON.SIZE + TEST_ICON.MARGIN,
      width: -1,
      position: 6,
    });
  }

  addPerkSlots() {
    this.blessSlots = new DragAndDropGrid(this, 200, 375, TEST_ICON.SIZE, 7);
    this.curseSlots = new DragAndDropGrid(this, 200, 525, TEST_ICON.SIZE, 7);

    this.blessSlots.setItems(this.blesses);
    this.curseSlots.setItems(this.curses);

    this.blessSlots.on(
      DRAG_AND_DROP_GRID_EVENT.ITEM_DROPPED_IN_SLOT,
      ({ item }) => console.log(item.data.get('title')),
    );
    this.curseSlots.on(
      DRAG_AND_DROP_GRID_EVENT.ITEM_DROPPED_IN_SLOT,
      ({ item }) => console.log(item.data.get('title')),
    );

    this.add.text(160, 290, 'Bless:', { fontSize: 32, color: '#000000' });
    this.add.text(160, 440, 'Curse:', { fontSize: 32, color: '#000000' });
  }

  createTestPerkIcon(size, color, perkData) {
    const spriteName = 'test-perk-icon-' + Math.random();
    const { id, title, type } = perkData;

    this.add
      .graphics()
      .fillStyle(color, 1)
      .fillRect(0, 0, size, size)
      .generateTexture(spriteName, size, size)
      .destroy();

    const item = this.add.image(0, 0, spriteName);

    item.setInteractive({ useHandCursor: true });
    item.setDataEnabled();
    item.data.set('id', id).set('title', title).set('type', type);

    return item;
  }
}
