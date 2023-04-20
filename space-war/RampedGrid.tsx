import React from "react";
import {
  Prefab,
  HNode,
  Stack,
  Ramp,
  RandomTransform,
  CodeKitComponent,
} from "@hiberworld/react-code-kit";

export const RampedGrid: CodeKitComponent = (props) => (
  <HNode {...props}>
    <Stack
      dim={[5, 3, 3]}
      segments={{ length: 2, direction: "LEFT" }}
      renderItem={() => (
        <Ramp
          length={5}
          gap={5.5}
          renderItem={() => <Prefab id="en_p_grid_platform_01" rotX={5} />}
        ></Ramp>
      )}
    ></Stack>
  </HNode>
);
