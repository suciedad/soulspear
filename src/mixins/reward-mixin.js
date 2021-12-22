export const RewardMixin = (reward) => (superclass) =>
  class extends superclass {
    constructor(...args) {
      super(...args);

      this.reward = reward;
    }

    getReward() {
      return this.reward;
    }
  };
