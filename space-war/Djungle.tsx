import React from "react";
import { Distribute, Hovering } from "@hiberworld/hdk-react-components";

import {
  CodeKitComponent,
  HNode,
  Prefab,
  Random,
  useRandom,
} from "@hiberworld/hdk-react";

import { Fish } from "./Fish";

import { Mist } from "./Mist";

const fishSpeed = 5;

export const Djungle: CodeKitComponent = (props) => {
  const random = useRandom();

  return (
    <>
      <Prefab
        dealDamageOnTouch={{
          amount: 10,
          knockbackStrengthInProcent: 0,
        }}
        visibility="never"
        id="plane_01"
        s={[1, 2, 1.1]}
        p={[0, -36, 55]}
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
            <Prefab x={item.x} z={item.z} id="glowing_mushroom" s={[2, 1, 2]} />
          )}
        ></Distribute>
      </HNode>
      <HNode p={[0, -29.5, 40]}>
        <Distribute
          maxItems={100}
          outerBoundRadius={20}
          gapFreq={0.1}
          gapMax={30}
          gapMin={3}
          spaceMin={4}
          spaceMax={30}
          gladeRadius={1}
          renderItem={(item) => (
            <Hovering magnitude={0.05}>
              <Prefab
                x={item.x}
                z={item.z}
                r={[0, random.int(0, 360), 0]}
                id={item.isSpace ? "bull_skull_01" : "en_p_jaguar_head_01_t2"}
                s={item.isSpace ? 2 : 0.2}
              />
            </Hovering>
          )}
        ></Distribute>
      </HNode>
      <Prefab id="water_plane_01" s={[10, 10, 18]} p={[0, -50, 65]} />
      <Mist p={[0, -32, 60]} />
      <HNode p={[0, -31.2, 0]}>
        <Fish dim={[10, 0, 120]} speed={fishSpeed} />
        <Fish dim={[10, 0, 120]} speed={fishSpeed} />
        <Fish dim={[10, 0, 120]} speed={fishSpeed} />
        <Fish dim={[10, 0, 120]} speed={fishSpeed} />
        <Fish dim={[10, 0, 120]} speed={fishSpeed} />
        <Fish dim={[10, 0, 120]} speed={fishSpeed} />
        <Fish dim={[10, 0, 120]} speed={fishSpeed} />
        <Fish dim={[10, 0, 120]} speed={fishSpeed} />
      </HNode>
      <Random seed={12}>
        <HNode p={[20, -26, 68]}>
          <Fish s={8} dim={[15, 0, 8]} speed={fishSpeed} />
        </HNode>
      </Random>
    </>
  );
};
