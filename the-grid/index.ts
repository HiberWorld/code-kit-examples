import {
  renderScene,
  create,
  Transform,
  HNode,
  HNodeWithMethods,
} from "@hiberworld/code-kit";
import { RandomSeed } from "@hiberworld/code-kit-utils";
import { BrickProps, bricks } from "./bricks";

const world = create({ y: -1 });

var rsd = new RandomSeed(8);

var brickSize = 4;

const grid: HNodeWithMethods[][] = [];
let existingBricks: HNodeWithMethods[] = [];

for (let x = 0; x < 4; x++) {
  grid[x] = [];

  for (let z = 0; z < 4; z++) {
    const transform: BrickProps = {
      pos: [(x - 2) * brickSize, 0, (z - 2) * brickSize],
      scale: 2,
      rot: [0, 0, 0],
      rsd,
    };

    const brick = rsd.randomFromArray(bricks)(transform);

    if (brick) {
      world.add(brick);
      grid[x][z] = brick;
      existingBricks.push(brick);
    }
  }
}

// wire signals
for (let x = 0; x < 4; x++) {
  for (let z = 0; z < 4; z++) {
    const brick = grid[x][z];

    if (brick && existingBricks.length) {
      const otherBrick = rsd.randomFromArray(existingBricks);

      if (brick === otherBrick) {
        console.log("Same!");
      } else {
        console.log(
          "Connecting " +
            brick.transform?.pos +
            " with " +
            otherBrick.transform?.pos
        );
      }

      existingBricks = existingBricks.filter((b) => b !== otherBrick);
    }
  }
}

renderScene({ root: world, environment: "above_clouds_01" });

console.log("There are " + existingBricks.length + " bricks left!");
