import { Scene } from 'phaser';

import { APP_SIZE } from '../constants/app';
import { SCENE_KEY } from '../constants/scene-key';

import { MAIN } from '../locales/main';

import redPlayer from '../assets/red-player.png';
import greenPlayer from '../assets/green-player.png';
import bluePlayer from '../assets/blue-player.png';
import yellowPlayer from '../assets/yellow-player.png';
import mainMenuButton from '../assets/main-menu-button-2.png';

// Nine Slice samples
import topLeft from '../assets/samples/nine-slice/top-left.png';
import topRight from '../assets/samples/nine-slice/top-right.png';
import bottomLeft from '../assets/samples/nine-slice/bottom-left.png';
import bottomRight from '../assets/samples/nine-slice/bottom-right.png';
import top from '../assets/samples/nine-slice/top.png';
import bottom from '../assets/samples/nine-slice/bottom.png';
import left from '../assets/samples/nine-slice/left.png';
import right from '../assets/samples/nine-slice/right.png';
import bg from '../assets/samples/nine-slice/bg.png';

import { ProgressBar } from '../components/progress-bar';

const PROGRESS_STYLE = {
  bgColor: 0xbdbdbd,
  barColor: 0x3db7e3,
  width: APP_SIZE.WIDTH * 0.35,
  height: 30,
  padding: 3,
  borderRadius: 5,
};

export class Loading extends Scene {
  constructor() {
    super({ key: SCENE_KEY.LOADING });
  }

  preload() {
    const loadingText = this.add.text(0, 0, MAIN.LOADING, {
      fill: '#ccc',
      fontSize: '18px',
    });

    // Images
    this.load.image('red-player', redPlayer);
    this.load.image('green-player', greenPlayer);
    this.load.image('blue-player', bluePlayer);
    this.load.image('yellow-player', yellowPlayer);
    this.load.image('main-menu-button', mainMenuButton);

    // Nine Slice samples
    this.load.image('top-left', topLeft);
    this.load.image('top-right', topRight);
    this.load.image('bottom-left', bottomLeft);
    this.load.image('bottom-right', bottomRight);
    this.load.image('top', top);
    this.load.image('bottom', bottom);
    this.load.image('left', left);
    this.load.image('right', right);
    this.load.image('bg', bg);

    // TODO - add samples for audio, font, animations
    // Sounds

    const progressBar = new ProgressBar(
      this,
      APP_SIZE.WIDTH * 0.5 - APP_SIZE.WIDTH * 0.35 * 0.5,
      APP_SIZE.HEIGHT * 0.5 + 25 - 35,
      0,
      1,
      0,
      PROGRESS_STYLE,
    );

    loadingText.x = APP_SIZE.WIDTH * 0.5 - loadingText.width * 0.5;
    loadingText.y = APP_SIZE.HEIGHT * 0.5 - loadingText.height * 0.5 - 35;

    this.load.on('progress', (value) => progressBar.setValue(value));

    this.load.on('complete', () => {
      progressBar.destroy();

      this.scene.start(SCENE_KEY.DEMO_GAME_SCENE);
    });
  }
}
