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

const Tube: CodeKitComponent<{ length: number }> = (input) => {
  const { p, r, props } = normalizeTransform(input);
  const length = input.length;

  return (
    <HNode r={r} p={p}>
      <Stack
        {...props}
        dim={16}
        segments={{ length, direction: "OUT" }}
        renderItem={() => <Prefab id="hiberpunk_blocks_o1_01" s={8} />}
      >
        {input.children}
      </Stack>
    </HNode>
  );
};

const Orb = (props: {
  y: number;
  z: number;
  startAt: number;
  duration: number;
}) => {
  return (
    <HNode
      y={props.y}
      z={props.z}
      animation={{
        x: [-60, -30, 0, 30, 60, 100],
        duration: props.duration,
        loop: "REVERSE",
        startAt: props.startAt,
        easing: "LINEAR",
      }}
    >
      <Spinning axis="y">
        <Hovering magnitude={5}>
          <Prefab id="glowing_orb_01" s={[1, 1, 1]} />
          <Prefab id="torus_thin_01" s={[1, 1, 1]} />
        </Hovering>
      </Spinning>
    </HNode>
  );
};

const World = () => {
  return (
    <HNode s={1}>
      <Prefab id="hiberpunk_decoration_disc_t1" s={2}>
        <Prefab id="gpl_spawn_point_01" y={1} />
      </Prefab>
      {/* <Prefab id="fx_particlesystem_mist_02" s={[60, 10, 10]} /> */}

      {/* <Orb y={0} z={0} startAt={0} duration={2} />
      <Orb y={1} z={10} startAt={2} duration={3} />
      <Orb y={-1} z={-10} startAt={4} duration={3.5} />
      <Orb y={4} z={5} startAt={3} duration={1.5} />
      <Orb y={5} z={-5} startAt={4} duration={5} />
      <Orb y={-4} z={-10} startAt={5} duration={6} />
      <Orb y={-10} z={0} startAt={0} duration={2} />
      <Orb y={-10} z={-6} startAt={1} duration={8} />
      <Orb y={10} z={-6} startAt={2} duration={1.3} /> */}

      <HNode>
        <Tube length={8}>
          <Hub />
          {/* <Prefab id="torus_thick_01" rotX={90} s={40} z={-20} />
          <Prefab id="torus_thin_01" rotX={90} s={52} z={-20} /> */}
          {/* <HNode rotX={90} rotY={180} z={0}>
            <InCircle
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
          </HNode>
          <HNode p={[-30, 39.5, -105]} rotZ={-90}>
            <Grid
              rows={12}
              columns={11}
              itemSpacing={8}
              children={(row, column) => {
                return <Prefab id="en_p_grid_platform_01" s={[2.2, 1, 2.2]} />;
              }}
            ></Grid>
            <Containers />
            <RampedGrid p={[8, 20, 64]} s={[1, 1, 1]} rotY={270} rotX={0} />
          </HNode>
          <HNode z={-120}>
            <Prefab id="torus_thick_01" rotX={90} s={40} />
            <Prefab id="torus_thin_01" rotX={90} s={52} z={-120} />
          </HNode>*/}
          <Tube z={-240} length={8}>
            {/* <HNode p={[10, 0, 50]} rotZ={-90}>
              <Grid
                rows={20}
                columns={1}
                itemSpacing={8}
                children={(row, column) => {
                  return (
                    <Prefab id="en_p_grid_platform_01" s={[2.2, 1, 2.2]} />
                  );
                }}
              ></Grid>
            </HNode> */}

            <Prefab id="torus_thick_01" rotX={90} s={40} z={-20} />
            <Prefab id="torus_thin_01" rotX={90} s={52} z={-20} />
            <HNode rotX={90} rotY={180} z={0}>
              <InCircle
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
              <Prefab id="candles_01" s={[100, 100, 80]} rotY={90} y={120} />
              <Prefab
                id="candles_01"
                s={[75, 50, 50]}
                rotY={90}
                y={120}
                z={30}
              />
            </HNode>
          </Tube>
          <Prefab id="hiberpunk_decoration_disc_t1" s={2}>
            <Prefab id="gpl_spawn_point_01" y={1} />
          </Prefab>

          <Tube length={4} p={[0, 0, -24]}>
            <Prefab id="en_m_hiberpunk_building_01_top" s={1.3} rotX={-90} />
          </Tube>
        </Tube>
      </HNode>
    </HNode>
  );
};

render(<World />, {
  environment: "planet_01",
});
