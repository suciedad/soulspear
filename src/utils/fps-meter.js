import Stats from 'stats.js';

export const addFPSMeter = () => {
  const stats = new Stats();

  stats.showPanel(0);

  document.body.appendChild(stats.dom);

  const animate = () => {
    stats.begin();
    // TODO - integrate Phaser update
    stats.end();

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};
