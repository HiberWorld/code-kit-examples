import React from "react";
import {
  render,
  Prefab,
  HNode,
  Stack,
  CodeKitComponent,
} from "@hiberworld/react-code-kit";
import { Spinning } from "@hiberworld/react-code-kit/src/components/Spinning";

const Tunnel: CodeKitComponent = (props) => {
  return <Prefab id="en_m_tunnel_bridge_01">{props.children}</Prefab>;
};

const junction = () => {
  return <Prefab id="en_m_tunnel_bridge_02"></Prefab>;
};

const World = () => {
  // var rsd = new RandomSeed(8);

  // const bridge2 = create("en_m_tunnel_bridge_01", { z: 12 }).addTo(bridge);
  // const junction = create("en_m_tunnel_bridge_02", { z: 12 }).addTo(bridge2);
  // const bridge4a = create("en_m_tunnel_bridge_01", { z: 12 }).addTo(junction);

  // const bridge4b = create({ rotY: -90 })
  //   .add(create("en_m_tunnel_bridge_01", { z: 12 }))
  //   .addTo(junction);

  // const bridge4c = create({ rotY: 90 })
  //   .add(create("en_m_tunnel_bridge_01", { z: 12 }))
  //   .addTo(junction);

  // world.add(bridge);

  return (
    <HNode>
      <Prefab id="gpl_spawn_point_01" y={-1} />
      <HNode rotX={90}>
        <Stack s={12} segments={{ length: 6, direction: "UP" }} p={[0, 15, 0]}>
          <Prefab id="hiberpunk_blocks_o1_01" rotX={90} s={6} />
        </Stack>
      </HNode>

      <HNode rotX={270}>
        <Stack s={12} segments={{ length: 6, direction: "UP" }} p={[0, 15, 0]}>
          <Prefab id="hiberpunk_blocks_o1_01" rotX={90} s={6} />
        </Stack>
      </HNode>

      <Spinning rotX={90}>
        <Stack s={12} segments={{ length: 6, direction: "IN" }} p={[0, 0, 18]}>
          <Prefab id="en_m_tunnel_bridge_01" />
        </Stack>

        <Prefab id="hiberpunk_blocks_o1_01" rotX={90} s={[6, 6, 8]} />

        <Stack
          s={12}
          segments={{ length: 6, direction: "OUT" }}
          p={[0, 0, -18]}
        >
          <Prefab id="en_m_tunnel_bridge_01" />
        </Stack>
      </Spinning>
    </HNode>
  );
};

render(<World />, { environment: "planet_01" });
