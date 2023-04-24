import React from "react";
import {
  Prefab,
  HNode,
  Stack,
  CodeKitComponent,
  useRandom,
  Hovering,
} from "@hiberworld/react-code-kit";

import { Prefab as HPrefab, Scale3, scaleToVec3 } from "@hiberworld/code-kit";

type FishOptions = {
  dim?: Scale3;
};

const quadrants = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

export const Fish: CodeKitComponent<FishOptions> = (input) => {
  const { dim, ...props } = input;

  const random = useRandom();

  const box = scaleToVec3(dim) || [10, 10, 10];

  const x: number[] = quadrants.map((q) => {
    const lowX = (q.x * box[0]) / 2;
    const highX = lowX + box[0] / 2;

    return random.range(lowX, highX) - box[0] / 2;
  });

  x.push(x[0]);

  const z: number[] = quadrants.map((q) => {
    const lowZ = (q.y * box[2]) / 2;
    const highZ = lowZ + box[2] / 2;

    return random.range(lowZ, highZ) + box[2] / 2;
  });

  z.push(z[0]);

  console.log({ x, z });

  const step = random.int(0, z.length - 1);

  return (
    <Hovering {...props} magnitude={0.5}>
      <Prefab
        id="sphere_01"
        s={0.5}
        material="t_sci_fi_tile_02"
        audio={{
          attenuationModel: "EXPONENTIAL_DISTANCE",
          id: "a_am_automated_factory_01",
          looping: true,
          rollOffFactor: 1,
          startPlayingDist: 10,
          maxAttenuationDist: 0,
          minAttenuationDist: 10,
          volume: 1,
        }}
        pointlight={{
          color: "aquamarine",
          strength: 40,
          offset: [0, 2, 0],
          radius: 4,
        }}
        animation={{
          x,
          z,
          duration: 2,
          loop: "RESTART",
          easing: "EASE_IN_OUT_QUAD",
          startAt: step,
          steps: [10, 15, 20, 25, 30],
        }}
      />
    </Hovering>
  );
};
