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

const grid: HNodeWithMethods[][] = [];
let unsafeBricks: HNodeWithMethods[] = [];

const CENTER = 2;
const MAX = CENTER * 2;
const GRIDSIZE = MAX + 1;

function isSafe(x: number, z: number) {
  return (
    ((z === 0 || z === MAX) && x % 2 === 0) ||
    ((x === 0 || x === MAX) && z % 2 === 0)
  );
}

for (let x = 0; x < GRIDSIZE; x++) {
  grid[x] = [];

  for (let z = 0; z < GRIDSIZE; z++) {
    const dx = x - CENTER;
    const dz = z - CENTER;

    let rotY;

    rotY = Math.floor((Math.atan(dx / dz) * 360) / (2 * Math.PI)) - 90;

    console.log("rot:" + rotY);

    const transform: BrickProps = {
      pos: [(x - CENTER) * MAX, 0, (z - CENTER) * MAX],
      scale: 2,
      rot: [0, rotY, 0],
      rsd,
    };

    let factory: BrickFactory;
    let safe = isSafe(x, z);

    if (safe) {
      factory = spawnBrick;
    } else {
      factory = rsd.randomFromArray(bricks);
    }

    const brick = factory(transform);

    if (brick) {
      world.add(brick);
      grid[x][z] = brick;

      if (!safe) unsafeBricks.push(brick);
    }
  }
}

// wire signals
let i = 1;

for (let x = 0; x < GRIDSIZE; x++) {
  for (let z = 0; z < GRIDSIZE; z++) {
    const brick = grid[x][z];

    if (brick && unsafeBricks.length) {
      const otherBrick = rsd.randomFromArray(unsafeBricks);

      const id = (i++).toString();
      brick.signalSource = {
        id,
        playerProximitySensor: { maxDistance: 2.8, minDistance: 0 },
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

        otherBrick.signalListener = {
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
