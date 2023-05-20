import Fighter from "./Fighter";
import Player from "./Player";

export default interface GameEvents {
  kill: [target: Fighter, author: Fighter];
  poisoned: [target: Fighter, author: Fighter];
  dodge: [target: Fighter, author: Fighter];
  counter: [target: Fighter, author: Fighter];
  critical: [target: Fighter, author: Fighter];
  damage: [target: Fighter, author: Fighter];
  heal: [target: Fighter, author: Fighter];
  levelUp: [player: Player];
}
