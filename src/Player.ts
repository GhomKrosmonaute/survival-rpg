import Fighter from "./Fighter";

export default class Player extends Fighter {
  counters: Record<string, number> = {};
  skillPoints = 0;
  exp = 0;

  get neededExp(): number {
    return this.level * 100;
  }

  rename(name) {
    localStorage.removeItem(this.name);
    this.name = name;
    this.save();
  }

  damagesTo(target) {
    super.damagesTo(target);

    if (target.hp === 0) {
      if (target instanceof Player) {
        this.addExp(target.level * 100);
      } else {
        this.addExp(target.level * 50);
      }
    }
  }

  redistributeSkillPoints() {
    this.strengthSkill = 1;
    this.defenseSkill = 1;
    this.speedSkill = 1;
    this.luckSkill = 1;
    this.skillPoints = this.level - 1;
    this.save();
  }

  addSkillPoint(skillName) {
    if (this.skillPoints > 0) {
      this[skillName]++;
      this.skillPoints--;
      this.save();
    } else throw new Error("No skill points left");
  }

  /**
   * @param added {number}
   */
  addExp(added) {
    this.exp += added;

    while (this.exp >= this.neededExp) {
      this.exp -= this.neededExp;
      this.level++;
      this.skillPoints++;
    }

    this.save();
  }

  save() {
    localStorage.setItem(this.name, JSON.stringify(this));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      skillPoints: this.skillPoints,
      counters: this.counters,
      exp: this.exp,
    };
  }
}
