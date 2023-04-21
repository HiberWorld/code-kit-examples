import React from "react";
import {
  Prefab,
  HNode,
  Stack,
  CodeKitComponent,
} from "@hiberworld/react-code-kit";

import { Prefab as HPrefab } from "@hiberworld/code-kit";
import { normalizeTransform } from "./normalizeTransform";

type GravityWellOpts = {
  hologram: HPrefab;
};

export const GravityWell: CodeKitComponent<GravityWellOpts> = (input) => {
  const { p, s, r, props } = normalizeTransform(input);

  const { hologram } = input;

  return (
    <HNode p={p} r={r}>
      <Prefab id="en_m_tunnel_bridge_02" z={45} s={[4, 1, 1]}>
        <Prefab
          id="en_m_hiberpunk_building_02_top"
          z={60}
          y={-10}
          s={[0.1, 1, 0.6]}
          rotY={-90}
        />
        <Prefab id={hologram} z={-5}></Prefab>
      </Prefab>
      <Stack
        dim={35}
        segments={{ length: 4, direction: "IN" }}
        renderItem={() => (
          <Prefab id="en_m_tunnel_bridge_01" s={[1, 1.3, 3]} scaleX={2} />
        )}
      ></Stack>
    </HNode>
  );
};