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
  Spinning,
  InCircle,
  CodeKitComponent,
  Random,
} from "@hiberworld/react-code-kit";

import { Containers } from "./Containers";
import { RampedGrid } from "./RampedGrid";
import { Hub } from "./Hub";
import { Sentinels } from "./Sentinels";
import { Platform } from "./Platform";
import { RoofWalkway } from "./RoofWalkway";
import { Fish } from "./Fish";
import { Djungle } from "./Djungle";

const Tube: CodeKitComponent<{ length: number }> = (input) => {
  const { p, r, children, ...props } = input;
  const length = input.length;

  return (
    <HNode r={r} p={p}>
      <Stack
        {...props}
        dim={16}
        segments={{ length, direction: "OUT" }}
        renderItem={() => <Prefab id="hiberpunk_blocks_o1_01" s={8} />}
      >
        {children}
      </Stack>
    </HNode>
  );
};

export const StarshipHiberion = (props: {}) => {
  return (
    <HNode s={0.5}>
      <HNode>
        <Prefab
          id="en_m_hiberpunk_building_01_top"
          s={1.3}
          rotZ={180}
          rotX={90}
        />

        <Tube length={4} p={[0, 0, -8]}>
          <Hub />
          <Tube length={4} p={[0, 0, -20]}>
            <Sentinels />
            <Prefab id="torus_thick_01" rotX={90} s={40} z={-20} />
            <Prefab id="torus_thin_01" rotX={90} s={52} z={-20} />
            <HNode p={[0, 0, -140]}>
              <InCircle
                r={[90, 0, 0]}
                faceCenter={true}
                radius={52}
                items={10}
                renderItem={(item) => (
                  <Prefab
                    s={[7.5, 32, 4]}
                    rotY={90}
                    id="hiberpunk_blocks_m1_01"
                  />
                )}
              ></InCircle>
              <HNode x={0} y={0} rotX={90}>
                <Spinning duration={60}>
                  <Stack
                    dim={7}
                    segments={[{ length: 8, direction: "DOWN" }]}
                    renderItem={() => (
                      <Grid
                        rows={5}
                        columns={5}
                        itemSpacing={4}
                        children={({ row, column }) => {
                          return (
                            <Prefab
                              id={
                                row % 2
                                  ? "rounded_cylinder_01"
                                  : "rounded_cylinder_02"
                              }
                              y={3 * ((row + column) % 3)}
                              s={[1.2, 0.8, 1.2]}
                            />
                          );
                        }}
                      />
                    )}
                  ></Stack>
                </Spinning>
              </HNode>
              <HNode x={0} y={0} z={40}>
                <Prefab id="hiberpunk_decoration_disc_t1" s={2}>
                  <Prefab id="gpl_spawn_point_01" y={2} rotY={0} />
                </Prefab>
              </HNode>
              <HNode z={-10}>
                <Prefab id="torus_thick_01" rotX={90} s={40} />
                <Prefab id="torus_thin_01" rotX={90} s={52} />
                <Tube length={4}>
                  <Prefab id="torus_thick_01" rotX={90} s={40} z={-20} />
                  <Prefab id="torus_thin_01" rotX={90} s={52} z={-20} />
                  <HNode p={[0, 0, -140]}>
                    <InCircle
                      r={[90, 0, 0]}
                      faceCenter={true}
                      radius={52}
                      items={10}
                      renderItem={(item) => (
                        <Prefab
                          s={[7.5, 32, 4]}
                          rotY={90}
                          id="hiberpunk_blocks_m1_01"
                        />
                      )}
                    ></InCircle>
                    <Djungle />
                    <RoofWalkway p={[64, 10, 18.2]} />

                    <HNode z={10}>
                      <Prefab id="torus_thick_01" rotX={90} s={40} z={-20} />
                      <Prefab id="torus_thin_01" rotX={90} s={52} z={-20} />
                      <HNode r={[-90, 0, 0]}>
                        <Prefab id="candles_01" s={[100, 100, 80]} />
                        <Prefab id="candles_01" s={[75, 50, 50]} rotY={90} />
                      </HNode>
                    </HNode>
                  </HNode>
                </Tube>
              </HNode>
            </HNode>
            <Platform />
          </Tube>
        </Tube>
      </HNode>
    </HNode>
  );
};
