import { renderScene, create, prefabs } from '@hiberworld/code-kit';

const world = create({ y: -1 });

/////////////////////////////////////////// - NOTE - ////////////////////////////////////////
///// Due to the large number of assets being added you will need to have DevTools open /////
/////////////////////////////////////////////////////////////////////////////////////////////


// Add separate placement for larger assets currently in 'excludeIds"
const excludeIds = ['gpl_mechanic_count_down_timer_01', 'large_snow_plane_01', 'large_sand_plane_01', 'large_stone_floor_plane_01', 'large_stone_tiles_plane_03', 'plane_terrain_01', 'plane_terrain_02',
  'grass_plane_01', 'plane_01', 'plane_02', 'plane_03', 'mountain_02', 'mountain_01', 'unnamed', 'en_m_hiberpunk_building_01_bottom', 'en_m_hiberpunk_building_01_middle', 'en_m_hiberpunk_building_02_bottom',
  'en_m_hiberpunk_building_02_middle', 'en_m_hiberpunk_building_02_middle_02', 'en_m_hiberpunk_building_02_top', 'en_m_hiberpunk_building_01_top', 'en_m_hiberpunk_building_01_middle_02', 'en_m_hiberpunk_building_03_bottom',
  'en_m_hiberpunk_building_03_middle', 'en_m_hiberpunk_building_03_top'];


let z = 20; // Increase to have more space between each row to acommadate larger assets
let x = 0;
let offset = 100;
let i = 0;

for (const prefab in prefabs) {
  x += 35; // Increase to have more space between asset in the rows
  if (!excludeIds.includes(prefabs[prefab].id)) {
    create({
      prefabId: prefabs[prefab].id,
      y: 20, //Set higher for assets to be above fog
      x: 0 + x,
      z: z + offset,
      infoPanel: {
        header: 'Asset ID:',
        preBody: prefabs[prefab].id,
        maxShowDistance: 40,
        minShowDistance: 0
      }
    }).addTo(world);
    i += 1;
    if (i % 10 === 0) {
      offset += z;
      x = 0;
      i = 0;
    }
  }
};

// Plane to add specific assets
const TestPlane = create({ prefabId: 'plane_02', y: 20, z: 60 }).addTo(world);

create('tree_02', {
  x: 0,
  y: 3,
  z: 0,
}).addTo(TestPlane);

create('gpl_spawn_point_01', {
  y: 1,
  x: 5
}).addTo(TestPlane);


renderScene({ root: world, environment: 'midday_clear_01' });