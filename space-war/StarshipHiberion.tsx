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
} from "@hiberworld/react-code-kit";

import { Containers } from "./Containers";
import { RampedGrid } from "./RampedGrid";
import { Hub } from "./Hub";
import { Sentinels } from "./Sentinels";
import { Platform } from "./Platform";
import { RoofWalkway } from "./RoofWalkway";

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

export const StarshipHiberion = (props: {}) => (
  <HNode s={0.5}>
    {/* <Prefab id="fx_particlesystem_mist_02" s={[60, 10, 10]} /> */}
    <HNode>
      <Prefab
        id="en_m_hiberpunk_building_01_top"
        s={1.3}
        rotZ={180}
        rotX={90}
      />

      <Tube length={4} p={[0, 0, -8]}>
        <Hub />
        <Tube length={8} p={[0, 0, -20]}>
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
            />
            <HNode z={-10}>
              <Prefab id="torus_thick_01" rotX={90} s={40} />
              <Prefab id="torus_thin_01" rotX={90} s={52} />
              <Tube length={8}>
                <RoofWalkway />

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
                  />
                  <Prefab
                    dealDamageOnTouch={{
                      amount: 10,
                      knockbackStrengthInProcent: 0,
                    }}
                    visibility="never"
                    id="plane_01"
                    s={[10, 10, 40]}
                    p={[0, -52, 0]}
                  />
                  <HNode p={[0, -35.2, 50]}>
                    <Distribute
                      outerBoundRadius={35}
                      gapFreq={0.7}
                      gapMax={4}
                      gapMin={2}
                      spaceMax={13}
                      spaceMin={12}
                      gladeRadius={12}
                      renderItem={(item) => (
                        <Prefab
                          x={item.x}
                          z={item.z}
                          id="glowing_mushroom"
                          s={[2, 1, 2]}
                        />
                      )}
                    ></Distribute>
                  </HNode>
                  <Prefab
                    id="water_plane_01"
                    s={[10, 10, 40]}
                    p={[0, -50, 0]}
                  />

                  <HNode x={0} z={40}>
                    <Prefab id="hiberpunk_decoration_disc_t1" s={2}>
                      <Prefab id="gpl_spawn_point_01" y={2} rotY={180} />
                    </Prefab>
                  </HNode>
                  <HNode z={0}>
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
