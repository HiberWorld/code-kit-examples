import React from "react";
import { Prefab, HNode, Stack } from "@hiberworld/react-code-kit";

export const Containers = () => (
  <HNode z={40} s={1.1}>
    <Prefab id="en_p_shipping_container_01">
      <Prefab id="en_p_shipping_container_01" y={5}></Prefab>
      <Stack p={[0, 0, 12]} s={5} segments={{ length: 3, direction: "UP" }}>
        <Prefab id="en_p_shipping_container_01"></Prefab>
      </Stack>
      <Prefab id="en_p_shipping_container_01" x={5} z={15}></Prefab>
      <Prefab
        id="en_p_shipping_container_01"
        x={5}
        z={7}
        y={3.8}
        s={[0.8, 0.8, 1.2]}
        rotX={-30}
      ></Prefab>
      <Stack p={[0, 0, 24]} s={5} segments={{ length: 4, direction: "UP" }}>
        <Prefab id="en_p_shipping_container_01"></Prefab>
      </Stack>
    </Prefab>
  </HNode>
);
