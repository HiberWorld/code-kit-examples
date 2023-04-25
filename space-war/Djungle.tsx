import React from "react";
import {
  Prefab,
  CodeKitComponent,
  useRandom,
  InCircle,
  Spinning,
  Distribute,
  HNode,
  Random,
} from "@hiberworld/react-code-kit";

import { Prefab as PrefabType } from "@hiberworld/code-kit";
import { Fish } from "./Fish";
import { Mist } from "./Mist";

const fishSpeed = 5;

export const Djungle: CodeKitComponent = (props) => (
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
