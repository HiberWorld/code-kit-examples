import {
  BaseTransform,
  create,
  EulerRotation,
  HNode,
  HNodeWithMethods,
  prefabs,
  Transform,
} from "@hiberworld/code-kit";
import { RandomSeed } from "@hiberworld/code-kit-utils";

export type BrickProps = BaseTransform & { rsd: RandomSeed };
export type BrickFactory = (transform: BrickProps) => HNodeWithMethods | void;

export const missingBrick: BrickFactory = (transform: BrickProps) => {};

export const baseBrick: BrickFactory = (props: BrickProps) => {
  const transform = {
    ...props,
    rot: [0, 0, 0] as EulerRotation,
  };
  const brick = create({ prefabId: "flat_cube_01", transform });

  const arrow = create("sign_arrow_01", {
    y: 0.3,
    rotY: props.rot[1],
    scale: 0.2,
  });

  brick!.add(arrow);
  return brick;
};

export const simpleBrick: BrickFactory = (transform: BrickProps) => {
  const brick = baseBrick(transform);
  return brick;
};

export const spawnBrick: BrickFactory = (transform: BrickProps) => {
  const brick = baseBrick(transform);

  const spawn = create("gpl_spawn_point_01", {
    y: 0.1,
    colliderIsDisabled: { dummy: true },
  });

  brick!.add(spawn);

  return brick;
};

export const blinkingBrick: BrickFactory = (transform: BrickProps) => {
  const brick = baseBrick({
    ...transform,
    scale: [2, 0.5, 2],
  })!;
  brick.prefabId = "rock_cube_01_t1";
  return brick;
};

export const pointingBrick: BrickFactory = (props: BrickProps) => {
  const brick = baseBrick(props);

  return brick;
};

export const bricks = [missingBrick, simpleBrick, blinkingBrick, pointingBrick];
