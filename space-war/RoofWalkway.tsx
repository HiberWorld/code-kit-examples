import React from "react";
import { Grid } from "@hiberworld/hdk-react-components";

import { CodeKitComponent, HNode, Prefab } from "@hiberworld/hdk-react";

export const RoofWalkway: CodeKitComponent = (props) => (
  <HNode {...props}>
    <Grid
      rows={16}
      columns={1}
      itemSpacing={8}
      children={(row, column) => {
        return <Prefab id="en_p_grid_platform_01" s={[2.2, 1, 2.2]} />;
      }}
    ></Grid>
  </HNode>
);
