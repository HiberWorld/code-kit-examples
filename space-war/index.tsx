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
import { Prefab as HPrefab } from "@hiberworld/code-kit";
import { Spinning } from "@hiberworld/react-code-kit/src/components/Spinning";

import { normalizeTransform } from "./normalizeTransform";
import { Containers } from "./Containers";
import { RampedGrid } from "./RampedGrid";
import { Hub } from "./Hub";
import { Sentinels } from "./Sentinels";
import { StarshipHiberion } from "./StarshipHiberion";

const spaceship = "hiberpunk_decoration_disc_t1" as HPrefab; // spaceship_01

const World = () => {
  return (
    <HNode>
      {/* <StarshipHiberion /> */}

      <HNode x={200}>
        <Prefab id={spaceship} s={2}>
          <Prefab id="gpl_spawn_point_01" y={2} rotY={90} />
        </Prefab>

        <Prefab
          id="cube_01"
          z={3}
          x={-10}
          signalSource={{
            id: "source1",
            lookAtSensor: true,
            playerProximitySensor: { maxDistance: 5 },
          }}
        />
        <Prefab
          id="rock_cube_01_t1"
          z={-3}
          x={-10}
          signalListener={{
            target: "source1",
            invisibleOnSignal: true,
          }}
          signalSource={{
            id: "source2",
            lookAtSensor: true,
            playerProximitySensor: { maxDistance: 5 },
          }}
        />
      </HNode>
    </HNode>
  );
};

const baseUrl = "https://dao-pr.dev.hiberdev.net/engine/dev/latest/production";

render(<World />, {
  environment: "planet_01", //dark_city_night_01

  engineUrl: `${baseUrl}/hiber.js`,
  wasmUrl: `${baseUrl}/Hiberworld.wasm.gz`,
});
