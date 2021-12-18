export const PERK_TYPE = {
  BLESS: 'bless',
  CURSE: 'curse',
};

export class Perk {
  constructor(id, title, subtitle, description, type, chance) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.type = type;
    this.chance = chance;
  }

  isBless() {
    return this.type === PERK_TYPE.BLESS;
  }

  isCurse() {
    return this.type === PERK_TYPE.CURSE;
  }
}
