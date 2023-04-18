import React from "react";
import {
  render,
  Prefab,
  HNode,
  Stack,
  CodeKitComponent,
} from "@hiberworld/react-code-kit";
import { Spinning } from "@hiberworld/react-code-kit/src/components/Spinning";
import { normalizeTransform } from "./normalizeTransform";

const Tunnel: CodeKitComponent = (props) => {
  return <Prefab id="en_m_tunnel_bridge_01">{props.children}</Prefab>;
};

const junction = () => {
  return <Prefab id="en_m_tunnel_bridge_02"></Prefab>;
};

const Gravity = (input) => {
  const { p, s, r, props } = normalizeTransform(input);

  return (
    <HNode p={p} r={r}>
      <Prefab id="en_m_tunnel_bridge_03" z={72} />
      <Stack s={12} segments={{ length: 6, direction: "IN" }}>
        <Prefab id="en_m_tunnel_bridge_01" />
      </Stack>
    </HNode>
  );
};
const Tube = (input) => {
  const { p, r, props } = normalizeTransform(input);

  // console.log({ p, s, r, props });

  return (
    <HNode r={r} p={p}>
      <Stack {...props} s={16} segments={{ length: 1, direction: "IN" }}>
        <Prefab id="hiberpunk_blocks_o1_01" s={8} />
      </Stack>
    </HNode>
  );
};

const World = () => {
  return (
    <HNode>
      <Prefab id="hiberpunk_decoration_disc_t1" s={6} />
      <Prefab id="gpl_spawn_point_01" y={2} />

      <HNode>
        <Tube rotX={90} y={16} />
        <Tube rotX={270} y={-8} />
        <Spinning duration={100}>
          <Gravity p={[0, 0, 19]}></Gravity>
          <HNode showAxisMarker>
            <Gravity rotY={180} p={[0, 0, -19]}></Gravity>
          </HNode>
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

render(<World />, { environment: "planet_01" });
