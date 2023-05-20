import Enemy from "./Enemy";
import Player from "./Player";

import type GameEvents from "./GameEvents";

export default class Skill<EventName extends keyof GameEvents> {
  constructor(
    name: string,
    description: string,
    gainEvent: EventName,
    gainCondition: (...params: GameEvents[EventName]) => boolean
  ) {}
}

export const skills = [
  new Skill(
    "Low Poison Resistance",
    "You resist poison by 25%",
    "kill",
    (target, author) => {
      if (target instanceof Enemy && author instanceof Player) {
        if (
          target.skills.includes("Powerful Poison Touch") &&
          target.level >= author.level
        ) {
          if (Math.random() < 1 / 2) {
            return true;
          }
        }
      }

      return false;
    }
  ),
  new Skill(
    "Medium Poison Resistance",
    "You resist poison by 50%",
    "poisoned",
    (target, author) => {
      if (target instanceof Player) {
        if (target.skills.includes("Low Poison Resistance")) {
          if (!target.counters.poisoned) {
            target.counters.poisoned = 0;
          } else {
            target.counters.poisoned++;

            if (target.counters.poisoned >= 15) {
              return true;
            }
          }
        }
      }

      return false;
    }
  ),
  new Skill(
    "High Poison Resistance",
    "You resist poison by 75%",
    "poisoned",
    (target, author) => {
      if (target instanceof Player) {
        if (target.skills.includes("Medium Poison Resistance")) {
          if (!target.counters.poisoned) {
            target.counters.poisoned = 0;
          } else {
            target.counters.poisoned++;

            if (target.counters.poisoned >= 100) {
              return true;
            }
          }
        }
      }

      return false;
    }
  ),
  new Skill(
    "Poison Immunity",
    "You resist poison by 100%",
    "poisoned",
    (target, author) => {
      if (target instanceof Player) {
        if (target.skills.includes("High Poison Resistance")) {
          if (!target.counters.poisoned) {
            target.counters.poisoned = 0;
          } else {
            target.counters.poisoned++;

            if (target.counters.poisoned >= 1000) {
              return true;
            }
          }
        }
      }

      return false;
    }
  ),
  new Skill(
    "Poison Touch",
    "You poison your enemy when you attack. Poison removes 5% of HP each turn.",
    "kill",
    (target, author) => {
      if (target instanceof Enemy && author instanceof Player) {
        if (
          target.skills.includes("Powerful Poison Touch") &&
          target.level >= author.level
        ) {
          if (Math.random() < 1 / 2) {
            return true;
          }
        }
      }

      return false;
    }
  ),
  new Skill(
    "Powerful Poison Touch",
    "You poison your enemy when you attack. Poison removes 2% of HP each turn. Poison effect stacks.",
    "poisoned",
    (target, author) => {
      if (target instanceof Enemy && author instanceof Player) {
        if (
          author.skills.includes("Poison Touch") &&
          author.level >= target.level
        ) {
          if (!author.counters.enemyPoisoned) {
            author.counters.enemyPoisoned = 1;
          } else {
            author.counters.enemyPoisoned++;

            if (author.counters.enemyPoisoned >= 1000) {
              return true;
            }
          }
        }
      }

      return false;
    }
  ),
];
