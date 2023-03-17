import {
  renderScene,
  create,
  Transform,
  HNode,
  HNodeWithMethods,
} from "@hiberworld/code-kit";
import { hiber_cube } from "@hiberworld/code-kit-prefabs";
import { RandomSeed } from "@hiberworld/code-kit-utils";
import { BrickFactory, BrickProps, bricks, spawnBrick } from "./bricks";

const world = create({ y: -1 });

var rsd = new RandomSeed(8);

var brickSize = 4;

const grid: HNodeWithMethods[][] = [];
let unsafeBricks: HNodeWithMethods[] = [];

for (let x = 0; x < 5; x++) {
  grid[x] = [];

  for (let z = 0; z < 5; z++) {
    const transform: BrickProps = {
      pos: [(x - 2) * brickSize, 0, (z - 2) * brickSize],
      scale: 2,
      rot: [0, 0, 0],
      rsd,
    };

    let factory: BrickFactory;
    let unsafe = false;

    if (z + x === 0) {
      factory = spawnBrick;
    } else {
      factory = rsd.randomFromArray(bricks);
      unsafe = true;
    }

    const brick = factory(transform);

    if (brick) {
      world.add(brick);
      grid[x][z] = brick;

      if (unsafe) unsafeBricks.push(brick);
    }
  }
}

// wire signals
let i = 1;

for (let x = 0; x < 5; x++) {
  for (let z = 0; z < 5; z++) {
    const brick = grid[x][z];

    if (brick && unsafeBricks.length) {
      const otherBrick = rsd.randomFromArray(unsafeBricks);

      const id = (i++).toString();
      brick.signalSource = {
        id,
        playerProximitySensor: { maxDistance: 3, minDistance: 0 },
      };

      if (brick === otherBrick) {
        console.log("Same!");
      } else {
        console.log(
          "Connecting " +
            brick.transform?.pos +
            " with " +
            otherBrick.transform?.pos
        );

        brick.signalListener = {
          target: id,
          invisibleOnSignal: { dummy: true },
        };
      }

      unsafeBricks = unsafeBricks.filter((b) => b !== otherBrick);
    }
  }
}

renderScene({ root: world, environment: "above_clouds_01" });

console.log("There are " + unsafeBricks.length + " bricks left!");
