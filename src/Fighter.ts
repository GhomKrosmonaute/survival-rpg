import Player from "./Player";

export default class Fighter {
  level = 1;
  name = "No name";
  hp = 0;

  strengthSkill = 1;
  defenseSkill = 1;
  speedSkill = 1;
  luckSkill = 1;

  skills = [];

  constructor(name) {
    const raw = localStorage.getItem(name);

    if (raw !== null) {
      Object.assign(this, JSON.parse(raw));
    } else {
      this.hp = this.maxHp;
      this.name = name;
    }
  }

  get maxHp() {
    return this.defenseSkill * 100;
  }

  get defense() {
    return this.defenseSkill * 10;
  }

  get strength() {
    return this.strengthSkill * 10;
  }

  get luck() {
    return this.level / this.luckSkill;
  }

  get criticalDamages() {
    return this.strength * 1.5;
  }

  get criticalChance() {
    return Math.random() * this.level < this.luck / this.strengthSkill;
  }

  get counterDamages() {
    return this.defense / 2 + this.strength / 2;
  }

  get counterChance() {
    return Math.random() * this.level < this.luck / this.defenseSkill;
  }

  get dodgeChance() {
    return Math.random() * this.level < this.luck / this.speedSkill;
  }

  damagesTo(target) {
    if (this.criticalChance) {
      target.hp -= this.criticalDamages - target.defense;
    } else {
      target.hp -= this.strength - target.defense;
    }

    if (target.hp <= 0) {
      target.hp = 0;
    }

    target.save();
  }

  toJSON() {
    return {
      level: this.level,
      name: this.name,
      hp: this.hp,
      strengthSkill: this.strengthSkill,
      defenseSkill: this.defenseSkill,
      speedSkill: this.speedSkill,
      luckSkill: this.luckSkill,
      skills: this.skills,
    };
  }
}
