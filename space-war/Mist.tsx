import React from "react";
import {
  Prefab,
  CodeKitComponent,
  useRandom,
  InCircle,
  Spinning,
} from "@hiberworld/react-code-kit";

import { Prefab as PrefabType } from "@hiberworld/code-kit";

export const Mist: CodeKitComponent = (props) => (
  <Spinning duration={256} direction={-1} {...props}>
    <InCircle
      y={0}
      radius={45}
      items={13}
      renderItem={() => {
        const random = useRandom();
        return (
          <Prefab
            id={"fx_particlesystem_mist_02" as PrefabType}
            x={random.range(-6, 6)}
            y={random.range(0, 10)}
            z={random.range(-6, 6)}
            scale={3}
          />
        );
      }}
    />
  </Spinning>
);
