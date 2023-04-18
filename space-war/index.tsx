import React from "react";
import {
  render,
  Prefab,
  HNode,
  Stack,
  CodeKitComponent,
} from "@hiberworld/react-code-kit";
import { Prefab as HPrefab } from "@hiberworld/code-kit";
import { Spinning } from "@hiberworld/react-code-kit/src/components/Spinning";
import { normalizeTransform } from "./normalizeTransform";

type GravityWellOpts = {
  hologram: HPrefab;
};

const Gravity: CodeKitComponent<GravityWellOpts> = (input) => {
  const { p, s, r, props } = normalizeTransform(input);

  const { hologram } = input;

  return (
    <HNode p={p} r={r}>
      <Prefab id="en_m_tunnel_bridge_03" z={45} s={[4, 1, 1]}>
        <Prefab id={hologram} z={-5}></Prefab>
      </Prefab>
      <Stack s={12} segments={{ length: 4, direction: "IN" }}>
        <Prefab id="hiberpunk_blocks_p1_01" s={[1, 1.3, 5.8]} scaleX={2} />
      </Stack>
    </HNode>
  );
};
const Tube = (input) => {
  const { p, r, props } = normalizeTransform(input);

  // console.log({ p, s, r, props });

  return (
    <HNode r={r} p={p}>
      <Stack {...props} s={16} segments={{ length: 4, direction: "IN" }}>
        <Prefab id="hiberpunk_blocks_o1_01" s={8} />
      </Stack>
    </HNode>
  );
};

const World = () => {
  return (
    <HNode>
      <Prefab id="hiberpunk_decoration_disc_t1" s={2} />
      <Prefab id="gpl_spawn_point_01" y={3} />

      <HNode rotZ={90}>
        <Tube rotX={90} y={64} />
        <Tube rotX={270} y={-56} />
        <Spinning duration={100}>
          <Gravity p={[0, 0, 19]} hologram="hologram_01_hibert"></Gravity>
          <Gravity
            rotY={180}
            p={[0, 0, -19]}
            hologram="hologram_01_hibertina"
          ></Gravity>

          <Prefab
            id="quarter_pipe_wall_01"
            rotZ={0}
            s={[8, 4, 8]}
            x={13}
            z={8}
          />
          <Prefab
            id="quarter_pipe_wall_01"
            rotZ={180}
            s={[8, 4, 8]}
            x={-13}
            y={8}
            z={8}
          />
          <Prefab
            id="quarter_pipe_wall_01"
            rotY={90}
            s={[8, 4, 8]}
            x={13}
            y={0}
            z={-8}
          />
          <Prefab
            id="quarter_pipe_wall_01"
            rotY={180}
            s={[8, 4, 8]}
            x={-13}
            y={0}
            z={-8}
          />
        </Spinning>
      </HNode>
    </HNode>
  );
};

const baseUrl = "https://dao-pr.dev.hiberdev.net/engine/dev/latest/production";

render(<World />, {
  environment: "planet_01",

  engineUrl: `${baseUrl}/hiber.js`,
  wasmUrl: `${baseUrl}/Hiberworld.wasm.gz`,
});
