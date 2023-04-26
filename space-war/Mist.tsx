import React from "react";
import { InCircle, Spinning } from "@hiberworld/hdk-react-components";

import { CodeKitComponent, Prefab, useRandom } from "@hiberworld/hdk-react";
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
