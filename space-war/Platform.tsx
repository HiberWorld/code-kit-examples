import React from "react";
import { Grid } from "@hiberworld/hdk-react-components";

import { CodeKitComponent, HNode, Prefab } from "@hiberworld/hdk-react";

import { Containers } from "./Containers";
import { RampedGrid } from "./RampedGrid";

export const Platform: CodeKitComponent = (input) => (
  <HNode p={[-30, -39.5, -105]}>
    <Grid
      rows={12}
      columns={11}
      itemSpacing={8}
      children={(row, column) => {
        return <Prefab id="en_p_grid_platform_01" s={[2.2, 1, 2.2]} />;
      }}
    ></Grid>
    <Containers />
    <RampedGrid p={[8, 20, 64]} s={[1, 1, 1]} />
  </HNode>
);
