import React from "react";
import {
  Prefab,
  CodeKitComponent,
  useRandom,
  InCircle,
  Spinning,
  Grid,
  HNode,
  Stack,
} from "@hiberworld/react-code-kit";

import { Prefab as PrefabType } from "@hiberworld/code-kit";
import { random90Deg } from "@hiberworld/react-code-kit/src/utils";

export const MeatGrinder: CodeKitComponent = (props) => {
  const random = useRandom();

  return (
    <HNode {...props}>
      <Stack
        dim={7}
        segments={[{ length: 9, direction: "DOWN" }]}
        renderItem={(index) => (
          <HNode>
            <Spinning duration={60}>
              <InCircle
                radius={14}
                items={17}
                renderItem={({ index, progress }) => {
                  return (
                    <Prefab
                      material="t_rusted_metal_01"
                      id={
                        index % 2
                          ? "rounded_cylinder_01"
                          : "rounded_cylinder_02"
                      }
                      y={3 * (index % 3)}
                      s={[0.8, 0.6, 0.8]}
                    />
                  );
                }}
              />
            </Spinning>
            <Spinning direction={-1} duration={50}>
              <InCircle
                radius={10}
                items={8}
                renderItem={({ index, progress }) => {
                  return (
                    <Prefab
                      material="t_sci_fi_tile_03"
                      id={
                        index % 2
                          ? "rounded_cylinder_01"
                          : "rounded_cylinder_02"
                      }
                      y={3 * (index % 3) + random.range(0, 2)}
                      s={[2, 1, 2]}
                    />
                  );
                }}
              />
            </Spinning>
            <Spinning direction={1} duration={30}>
              <InCircle
                radius={5}
                items={3}
                renderItem={({ index, progress }) => {
                  return (
                    <HNode
                    //   spotlight={{
                    //     color: "red",
                    //     radius: 10,
                    //     strength: 100,
                    //     dir: [
                    //       random90Deg(random),
                    //       random90Deg(random),
                    //       random90Deg(random),
                    //     ],
                    //   }}
                    >
                      <Prefab
                        material="t_sci_fi_tile_04"
                        id={
                          index % 2
                            ? "rounded_cylinder_01"
                            : "rounded_cylinder_02"
                        }
                        y={3 * (index % 3) + random.range(0, 2)}
                        s={[2, 1, 2]}
                      />
                    </HNode>
                  );
                }}
              />
            </Spinning>
          </HNode>
        )}
      ></Stack>
    </HNode>
  );
};
