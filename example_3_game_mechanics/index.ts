import { HNode, renderScene, Scene } from '@hiberworld/code-kit';

const rock: HNode = {
  prefabId: 'cliff_02_01',
  transform: { pos: [-15, 1, 17], scale: [2, 2, 4], rot: [-6, 90, -3] },
};
const rock1: HNode = {
  prefabId: 'jungle_tree_large',
  transform: { pos: [20, -10, 15], scale: [1.9, 1.5, 1.7], rot: [0, 90, 0] },
};

// Please see Example 2 for details about how to use 'for-loop' , animation etc
const bridge: HNode = { transform: { pos: [-11, 22.5, -36], rot: [0, 0, -13] }, children: [] };
const steps = 27; // amount of objects at the cycle
for (let index = 0; index < steps; index++) {
  const radius = 4; // curvature radius
  const size = 0.5; // horizontal spacing between objects
  const itemsCount = Math.ceil(2 * radius * Math.PI) / size;

  const x = index; // height between objects

  const arc = -Math.sin((index * 2 * Math.PI) / itemsCount);
  const y = radius * arc;
  const z = itemsCount;

  bridge.children?.push({
    children: [
      { prefabId: 'en_p_footbridge_01', transform: { scale: [0.5, 1, 1] } },
      { prefabId: 'rope_railing_01', transform: { pos: [0, 0.3, 0.75] } },
      { prefabId: 'rope_railing_01', transform: { pos: [0, 0.3, -0.75] } },
      {
        keyframe: { timestamp: 0, easing: 'LINEAR' },
        transform: { pos: [0, 0, -0.3 * arc] },
      },
      {
        keyframe: { timestamp: 0.4 + 1, easing: 'EASE_OUT_BACK' },
        transform: { pos: [0, 0, 0.1 * arc] },
      },
    ],
    transform: {
      pos: [x, y, z],
      rot: [0, 0, (index / itemsCount) * 40 - 12],
    },
    keyframeAnimated: { loopBehaviour: 'REVERSE' },
  });
}

// Please see the Example 2 for details about how to use 'for-loop'
const bridge2: HNode = { transform: { pos: [-62, 23.5, -17.5], rot: [-10, 65, -12] }, children: [] };
const steps2 = 30; // amount of objects at the cycle
for (let index = 0; index < steps2; index++) {
  const radius = 4; // curvature radius
  const size = 0.5; // horizontal spacing between objects
  const itemsCount = Math.ceil(2 * radius * Math.PI) / size;

  const x = index; // height between objects
  const y = radius * -Math.sin((index * 2 * Math.PI) / itemsCount);
  const z = itemsCount;

  bridge2.children?.push({
    children: [
      { prefabId: 'en_p_footbridge_01' },
      { prefabId: 'rope_railing_01', transform: { pos: [0, 0.3, 0.75] } },
      { prefabId: 'rope_railing_01', transform: { pos: [0, 0.3, -0.75] } },
    ],
    transform: {
      pos: [x, y, z],
      rot: [0, 0, (index / itemsCount) * 40 - 12],
    },
  });
}

// Please see Example 2 for details about how to create a winding staircase
const calculatedStaircase: HNode = {
  transform: { pos: [20.5, 2.5, 15.5], rot: [0, -120, 0], scale: [1, 1, 1.5] },
  children: [],
};
const steps1 = 30; // amount of objects at the cycle
for (let index = 0; index < steps1; index++) {
  const radius = 3.2; // curvature radius
  const size = 1.3; // horizontal spacing between objects
  const itemsCount = Math.ceil(2 * radius * Math.PI) / size;

  const x = radius * Math.cos((index * 2 * Math.PI) / itemsCount);
  const y = index * 0.5; // height between objects
  const z = radius * -Math.sin((index * 2 * Math.PI) / itemsCount);

  calculatedStaircase.children?.push({
    children: [{ prefabId: 'en_p_footbridge_01' }, { prefabId: 'rope_railing_01', transform: { pos: [0, 0.3, 0.7] } }],
    transform: {
      pos: [x, y, z],
      rot: [0, (index / itemsCount) * 360 + 90, 0],
    },
  });
}
// Please see Example 1-2 for details about Animation
const animatedrocks = (): HNode => {
  const n = Math.random();
  return {
    keyframeAnimated: { loopBehaviour: 'RESTART' },
    transform: { pos: [-17, -2, 0], rot: [0, 3 * n, 3], scale: [0.5, 0.5, 0.5] },
    children: [
      { prefabId: 'rock_01_t2' },
      {
        keyframe: { easing: 'EASE_IN_CUBIC', timestamp: 0 },
        transform: { pos: [-9, 48.5, 10.5], rot: [0, 90, 0] },
      },
      {
        keyframe: { timestamp: 2 },
        transform: { pos: [-12, -2, 0], rot: [130, 90, 0] },
      },
    ],
  };
};

/*Please see Example 1 for details about scene rendering, setting up hot reloading, fly option,  etc
 */

// scene rendering
const scene: Scene = {
  root: {
    transform: { pos: [0, 0, 0], scale: [0.5, 0.5, 0.5] },
    prefabId: 'grass_plane_01',
    material: 't_sand_01',
    children: [
      rock,
      rock1,
      bridge,
      bridge2,
      calculatedStaircase,
      animatedrocks(),
      // Spawn point
      {
        prefabId: 'gpl_spawn_point_01',
        transform: { pos: [-1, 20.8, -27], rot: [0, 180, 0] },
      },
      { prefabId: 'en_p_torch_standing_01', transform: { pos: [18.4, 16, 16.7], scale: [1.5, 2, 1.5] } },
      { prefabId: 'tree_house_03', transform: { pos: [-28, 23, 16.7], rot: [0, 90, 0], scale: [2, 2, 1.5] } },
      { prefabId: 'campfire_01', transform: { pos: [-19, 24, 9], rot: [0, 0, 7], scale: [2, 2, 1.5] } },
      { prefabId: 'en_p_footbridge_01', transform: { pos: [16.5, 17, 16], rot: [0, 180, 0], scale: [1.2, 1, 1.2] } },
      { prefabId: 'rope_railing_01', transform: { pos: [16.5, 17.4, 16.8], rot: [0, 180, 0], scale: [1.2, 1, 1.2] } },
      { prefabId: 'cactus_01', transform: { pos: [-2, 11, 4.5], scale: [2, 3, 2], rot: [0, 0, 0] } },
      { prefabId: 'cactus_01', transform: { pos: [-3, 11, 4], scale: [2, 2, 2], rot: [-10, 50, 15] } },
      { prefabId: 'cactus_01', transform: { pos: [-9, 16.2, 7], scale: [4, 3, 4], rot: [0, 90, 0] } },
      { prefabId: 'cliff_02_02', transform: { pos: [-2, -1.5, -21], scale: [2, 3, 2], rot: [15, 170, 0] } },
      { prefabId: 'jungle_tree_small', transform: { pos: [-4, 20, -23], scale: [1.1, 1, 1.3], rot: [15, 170, 0] } },
      { prefabId: 'cliff_02_03', transform: { pos: [18, 2, -16], scale: [2, 1, 1], rot: [0, 60, 0] } },
      { prefabId: 'cactus_01', transform: { pos: [21, 5, -16], scale: [3, 4, 3], rot: [0, 0, 0] } },
      { prefabId: 'log_platform', transform: { pos: [-23, 21, 7], scale: [2, 1.3, 2], rot: [0, 205, 0] } },
      { prefabId: 'collectible_mandatory_key_01', transform: { pos: [10, 18, 16] } },
      { prefabId: 'collectible_mandatory_key_01', transform: { pos: [-8.7, 18, -9] } },
      { prefabId: 'goal_01', transform: { pos: [-20, 23.6, 16.5], scale: [2, 2, 2] } },
    ],
  },
  environment: 'midday_01',
};

renderScene(scene);
