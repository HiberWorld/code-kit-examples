import React from "react";
import {
  render,
  Prefab,
  HNode,
  Grid,
  Stack,
  Ramp,
  RandomTransform,
  Distribute,
  Hovering,
  InCircle,
  CodeKitComponent,
} from "@hiberworld/react-code-kit";
import {
  Prefab as HPrefab,
  HNode as HHNode,
  LoopBehaviour,
} from "@hiberworld/code-kit";
import { Spinning } from "@hiberworld/react-code-kit/src/components/Spinning";

import { Containers } from "./Containers";
import { RampedGrid } from "./RampedGrid";
import { Hub } from "./Hub";
import { Sentinels } from "./Sentinels";
import { StarshipHiberion } from "./StarshipHiberion";

const keyframeAnimated = { loopBehaviour: "REVERSE" as LoopBehaviour };

const pause = 5;
const speed = 8;

const World = () => {
  return (
    <HNode>
      <StarshipHiberion />
      <HNode keyframeAnimated={keyframeAnimated}>
        <HNode
          keyframe={{ easing: "EASE_IN_OUT_CUBIC", timestamp: 0 }}
          r={[0, 0, 0]}
        />
        <HNode
          keyframe={{ easing: "EASE_IN_OUT_CUBIC", timestamp: pause }}
          r={[0, 0, 0]}
        />
        <HNode
          keyframe={{
            easing: "EASE_IN_OUT_CUBIC",
            timestamp: pause + 2 * speed,
          }}
          r={[-90, 0, 0]}
        />
        <HNode
          keyframe={{
            easing: "EASE_IN_OUT_CUBIC",
            timestamp: pause + 2 * speed + 2,
          }}
          r={[-90, 0, 0]}
        />
        <HNode p={[0, 0, 140]}></HNode>
      </HNode>
      {/* <Stack
        dim={4}
        segments={{ length: 4, direction: "IN" }}
        renderItem={() => <Prefab id="cube_01" />}
      >
        <Prefab id="cactus_01" p={[0, 2, 0]} />
      </Stack> */}
    </HNode>
  );
};

const baseUrl = "https://dao-pr.dev.hiberdev.net/engine/dev/latest/production";

render(<World />, {
  environment: "hiberpunk_bloom_01",
  //starry_night_01
  //planet_01
  //dark_city_night_01
  //underwater_01
  //hiberpunk_bloom_01

  engineUrl: `${baseUrl}/hiber.js`,
  wasmUrl: `${baseUrl}/Hiberworld.wasm.gz`,
});
