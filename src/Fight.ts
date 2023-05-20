import Player from "./Player";

class Fight {
  constructor(data) {
    this.player = new Player(data.player);
    this.enemy = new Player(data.enemy);

    window.logs = [];

    window.logs.push(["text", `${this.player.name} vs ${this.enemy.name}`]);

    this.doNextTurn(1);
    this.launchTimeline();
  }

  doNextTurn(turn) {
    const [first, second] =
      this.player.speedSkill > this.enemy.speedSkill
        ? [this.player, this.enemy]
        : [this.enemy, this.player];

    first.damagesTo(second);

    if (first.hp > 0 && second.hp > 0) second.damagesTo(first);

    if (this.player.hp === 0 || this.enemy.hp === 0) {
      return;
    }

    this.doNextTurn(turn + 1);
  }

  launchTimeline() {
    const steps = window.logs.slice();

    let timeline = setInterval(() => {
      const step = steps.shift();
      if (step) {
        // do something
      } else {
        clearInterval(timeline);
      }
    }, 500);
  }
}

export default function getCurrentFight() {
  const raw = localStorage.getItem("currentFight");
  if (raw !== null) {
    return new Fight(JSON.parse(raw));
  }
  return null;
}
