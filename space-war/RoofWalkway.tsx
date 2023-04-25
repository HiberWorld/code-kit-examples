import React from "react";
import {
  Prefab,
  HNode,
  Stack,
  CodeKitComponent,
  Grid,
} from "@hiberworld/react-code-kit";

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
