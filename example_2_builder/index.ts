import { renderScene } from '@hiberworld/code-kit';
import { builder } from '@hiberworld/code-kit-utils';

const root = builder('grass_plane_01');

builder('ancient_urn_01')
  .setTransform({ pos: [1, 2, 3] })
  .setName('my_urn')
  .setInfoPanel({
    header: "I'm a urn",
  })
  .animate({ scale: [1, 2] })
  .addTo(root);

renderScene({
  environment: 'above_clouds_01',
  root,
});
