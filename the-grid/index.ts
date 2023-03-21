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

const BRICKSIZE = 4;
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
    const dx = MAX / 2 - x;
    const dz = MAX / 2 - z;

    let rotY;

    rotY = Math.floor((Math.atan2(dx, dz) * 180) / Math.PI);

    if (rotY < 0) rotY = rotY + 360;

    const transform: BrickProps = {
      pos: [(x - CENTER) * BRICKSIZE, 0, (z - CENTER) * BRICKSIZE],
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

      let targetPost;

      if (brick === otherBrick) {
        targetPost = create("fx_take_damage_purple_smoke_01", { y: 2 });
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

        targetPost = create({ y: 0 })
          .animate(
            {
              x: [
                /*brick.transform?.pos?.[0]!, */ otherBrick.transform
                  ?.pos?.[0]!,
              ],
              z: [
                /*brick.transform?.pos?.[2]!,*/ otherBrick.transform?.pos?.[2]!,
              ],
            },
            { easing: "LINEAR" }
          )
          .add(
            create("sphere_01", {
              y: 1,
              s: 0.1,
            })
          );
      }

      targetPost.transform.pos = { ...brick.transform?.pos };

      world.add(targetPost);

      unsafeBricks = unsafeBricks.filter((b) => b !== otherBrick);
    }
  }
}

renderScene({ root: world, environment: "above_clouds_01" });

console.log("There are " + unsafeBricks.length + " bricks left!");
