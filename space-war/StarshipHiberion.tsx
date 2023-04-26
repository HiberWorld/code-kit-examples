import React from "react";
import { Stack, InCircle } from "@hiberworld/hdk-react-components";

import { CodeKitComponent, HNode, Prefab } from "@hiberworld/hdk-react";

import { Hub } from "./Hub";
import { Sentinels } from "./Sentinels";
import { Platform } from "./Platform";
import { MeatGrinder } from "./MeatGrinder";

import { Djungle } from "./Djungle";
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

              <Prefab id="rounded_cylinder_01" rotX={90} s={[8, 1, 8]} z={3} />

              <MeatGrinder x={0} z={-10} y={0} rotX={90} />

              <HNode z={-10}>
                <Prefab id="torus_thick_01" rotX={90} s={40} />
                <Prefab id="torus_thin_01" rotX={90} s={52} />
                <Tube length={2}>
                  <Prefab
                    id="rounded_cylinder_01"
                    rotX={90}
                    s={[8, 1, 8]}
                    z={-3}
                  />

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
                    <HNode x={0} y={0} z={40}>
                      <Prefab id="hiberpunk_decoration_disc_t1" s={2}>
                        <Prefab id="gpl_spawn_point_01" y={2} rotY={0} />
                      </Prefab>
                    </HNode>
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