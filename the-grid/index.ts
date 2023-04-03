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
let safeBricks: HNodeWithMethods[] = [];

const BRICKSIZE = 4;
const CENTER = 4;
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
      else safeBricks.push(brick);
    }
  }
}

// wire signals
let i = 1;

// for (let x = 0; x < GRIDSIZE; x++) {
//   for (let z = 0; z < GRIDSIZE; z++) {

for (i = 0; i < safeBricks.length; i++) {
  // const brick = grid[x][z];
  const brick = safeBricks[i];

  // let safe = isSafe(x, z);

  // if (brick && !safe) {
  if (unsafeBricks.length) {
    const otherBrick = rsd.randomFromArray(unsafeBricks);

    const id = (i++).toString();
    brick.signalSource = {
      id,
      playerProximitySensor: { maxDistance: 2.8, minDistance: 0 },
    };

    if (brick === otherBrick) {
      otherBrick.prefabId = "en_m_primitive_window_01";

      otherBrick.transform!.rot![0] = 90;
      otherBrick.transform!.pos = [0, -1, 2];
      otherBrick.transform!.scale = 1;
    } else {
      brick.rendering = { materialID: "palette_01_green" };
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

      let targetPost;
      targetPost = create({ y: 0 })
        .animate(
          {
            x: [brick.transform?.pos?.[0]!, otherBrick.transform?.pos?.[0]!],
            z: [brick.transform?.pos?.[2]!, otherBrick.transform?.pos?.[2]!],
          },
          { loop: "RESTART", easing: "LINEAR" }
        )
        .add(
          create("sphere_01", {
            s: 0.1,
          })
        );

      targetPost.transform.pos = [0, 1, 0];

      world.add(targetPost);

      unsafeBricks = unsafeBricks.filter((b) => b !== otherBrick);
    }
  } else {
    console.log("No more unsafe bricks left!");
  }
}

//}
//}

renderScene({ root: world, environment: "above_clouds_01" });

console.log("There are " + unsafeBricks.length + " bricks left!");
