/**
 * This example file will explain how relative rotation and positioning works,
 * and also gives some hints of different ways to use it.
 * Refer to Example 1 for information about basic code structure.
 */

import { Scene, HNode, renderScene, create } from "@hiberworld/code-kit";
import {
  placeInCircle,
  PlaceInCircleOnEachProps,
} from "@hiberworld/code-kit-utils";

/**
 * This is a simple helper funtion to add a subtle animation to a node,
 * which will be used in these examples to draw attention to single nodes.
 *
 * @param node The node to add the animation to
 */

function addSubtleAnimation(node: HNode) {
  node.keyframeAnimated = { loopBehaviour: "REVERSE" };
  node.children?.push(
    {
      keyframe: { timestamp: 1.5, easing: "LINEAR" },
      transform: { pos: [0, 0, 0] },
    },
    {
      keyframe: { timestamp: 0.2, easing: "LINEAR" },
      transform: { pos: [0, 0.3, 0.2] },
    }
  );
}

/**
 * This section shows a simple examples of rotation by changing the 'rot' transpormation property.
 * Four ancient vases are put in a line in the air by placing them in X/Z space, and at a fixed Y height.
 * Positions and rotations are all relative to the parent object, which will be the root object,
 * i.e. the grass plane.
 */
const urn: HNode = {
  prefabId: "ancient_urn_01",
  transform: { pos: [26, 3, 7], rot: [0, 0, 0], scale: [1, 1, 1] },
};
const urn1: HNode = {
  prefabId: "ancient_urn_01",
  transform: { pos: [26, 3, 9], rot: [27, 0, 0], scale: [1, 1, 1] },
};
const urn2: HNode = {
  prefabId: "ancient_urn_01",
  transform: { pos: [26, 3, 11], rot: [0, 63, 0], scale: [1, 1, 1] },
};
const urn3: HNode = {
  prefabId: "ancient_urn_01",
  transform: { pos: [26.5, 3, 13], rot: [0, 0, 33], scale: [1, 1, 1] },
};

/**
 * This section shows how to use a 'for-loop' to create 15 bridge railings,
 * and space them out evenly by calculating their X position.
 * All parts will have the bridge as its parent, so all parts will be spaced
 * relative to the bridge object, and rotated together if the bridge object
 * rotate.
 *
 * The bridge will be put into the world at 45 degrees around the Y axis to
 * the parent, which in this context will be the grass plane.
 */
const bridge: HNode = {
  transform: { pos: [10, 1.5, 27], rot: [0, 45, 0] },
  children: [],
};
for (let i = 0; i < 15; i++) {
  bridge.children?.push({
    children: [
      { prefabId: "en_p_footbridge_01" },
      { prefabId: "rope_railing_01", transform: { pos: [0, 0, -0.8] } },
      { prefabId: "rope_railing_01", transform: { pos: [0, 0, 0.8] } },
    ],
    transform: { pos: [1.5 * i, 1, 0], rot: [0, 0, 0] },
  });
}

/**
 * Add a subtle animation to the middle bridge segment to show that it is
 * controlled individually.
 *
 * We use an 'as' casting to override typescript complains that the node might not exist,
 * because we know it does.
 */

addSubtleAnimation(bridge.children?.[7] as HNode);

/**
 * This section uses the same principle to create a form where every
 * segment is the child of the one before, which allows us to specify
 * the rotation of each segment as relative to the one before.
 *
 * This is a simple and handy way of creating cyclic objects.
 *
 * The 'cubeSpiralBase' will have its rotation relative to the world,
 * and 20 subsequents 'segments' will specify rotation relative to the one before.
 */

const cubeSpiralBase: HNode = {
  prefabId: "en_p_footbridge_01",
  transform: { pos: [9, 2.5, 9], rot: [-20, 0, 0], scale: [1, 1, 1] },
};

let currentCubeSegment: HNode = cubeSpiralBase;
for (let i = 0; i < 20; i++) {
  const cube1: HNode = {
    prefabId: "en_p_footbridge_01",
    transform: { pos: [2, 1, 0], rot: [4 * i, -15, 30], scale: [1, 1, 1] },
  };
  currentCubeSegment.children = [cube1];
  currentCubeSegment = currentCubeSegment.children[0];
}

/**
 * Sometimes, you want more control over the exact placement and rotation of an object.
 * In that case, you might choose to calculate each objects placement individually
 * instead of relying on a parent/child inherited rotation.
 *
 * This section creates a winding staircase by placing 20 steps relative to the base object.
 * This will allow them to act individually without changing any other objects in the stair,
 * for example, by adding an animation to it.
 */

const calculatedStaircaseBase: HNode = {
  transform: { pos: [-2, 2.1, 13] },
  children: [],
};

// Loop for 20 times to create stairs
for (let index = 0; index < 20; index++) {
  const radius = 4; // curvature radius
  const size = 1.7; // horizontal spacing between objects
  const itemsCount = Math.ceil(2 * radius * Math.PI) / size;

  const x = radius * Math.cos((index * 2 * Math.PI) / itemsCount);
  const y = index * 0.35; // height between objects
  const z = radius * -Math.sin((index * 2 * Math.PI) / itemsCount);

  // Add each stair as an individual child of the base object
  calculatedStaircaseBase.children?.push({
    children: [
      { prefabId: "en_p_footbridge_01" },
      { prefabId: "rope_railing_01", transform: { pos: [0, 0, 0.7] } },
    ],
    transform: {
      pos: [x, y, z],
      rot: [0, (index / itemsCount) * 360 + 90, 0],
    },
  });
}

addSubtleAnimation(calculatedStaircaseBase.children?.[10] as HNode);

const createFootbridgeSegment = (props: PlaceInCircleOnEachProps) => {
  const x = props.pos[0];
  const y = props.pos[1] + props.index * 0.35;
  const z = props.pos[2];

  return {
    children: [
      { prefabId: "en_p_footbridge_01", rot: [0, 90, 0] },
      {
        prefabId: "rope_railing_01",
        transform: { pos: [0.7, 0.2, 0], rot: [0, 90, 0] },
      },
    ],
    transform: {
      rot: props.rot,
      pos: [x, y, z],
    },
  } as HNode;
};

const steps = placeInCircle({
  onEach: createFootbridgeSegment,
  numberOfItems: 15,
  radius: 5,
  degToRotate: 270,
});

addSubtleAnimation(steps[13]);

const placeInCircleStaircaseBase = create({
  transform: { pos: [-20, 2.1, 17], rot: [0, 0, 0] },
}).add(...steps);

// Loop for 20 times to create stairs
for (let index = 0; index < 20; index++) {
  const radius = 4; // curvature radius
  const size = 1.7; // horizontal spacing between objects
  const itemsCount = Math.ceil(2 * radius * Math.PI) / size;

  const x = radius * Math.cos((index * 2 * Math.PI) / itemsCount);
  const y = index * 0.35; // height between objects
  const z = radius * -Math.sin((index * 2 * Math.PI) / itemsCount);

  // Add each stair as an individual child of the base object
  calculatedStaircaseBase.children?.push({
    children: [
      { prefabId: "en_p_footbridge_01" },
      { prefabId: "rope_railing_01", transform: { pos: [0, 0, 0.7] } },
    ],
    transform: {
      pos: [x, y, z],
      rot: [0, (index / itemsCount) * 360 + 90, 0],
    },
  });
}

addSubtleAnimation(calculatedStaircaseBase.children?.[10] as HNode);

/**
 * This section recreate the same staircase, but with a parent/child relationship
 * between each step, taking advantage of relative positioning and rotation.
 *
 * This is simpler, but notice the difference when applying an animation to an
 *  object in the middle.
 */

const relativeStaircaseBase: HNode = {
  transform: { pos: [-14, 2.1, 17], rot: [0, 0, 0] },
  children: [],
};

// Variable to keep track of the current stair step
let currentParentStep: HNode = relativeStaircaseBase;

// Variable to store the middle step for later
let middleStep = {};

for (let index = 0; index < 20; index++) {
  const step: HNode = {
    children: [
      { prefabId: "en_p_footbridge_01" },
      { prefabId: "rope_railing_01", transform: { pos: [0, 0, 0.7] } },
    ],
    transform: {
      pos: [1.6, 0.3, 0],
      rot: [0, 23, 0],
    },
  };
  currentParentStep.children?.push(step);
  currentParentStep = step;

  // If this is the step in the middle, store the reference
  // so we can add an animation to it later.

  if (index === 10) {
    middleStep = step;
  }
}

/**
 * Notice here that all subsequent segments are moved together with the child.
 * Contrast this to the example above.
 */
addSubtleAnimation(middleStep);

/**
 * This is another example of creating a form where every segment
 * is calculated separately, in order to apply different animation
 * settings to each step.
 *
 * This shows how to create a function to generate the objects.
 */

const makeSpiral = (): HNode => {
  const staircase: HNode = { transform: { pos: [5, 2.1, 0] }, children: [] };

  const steps = 10;
  for (let index = 0; index < steps; index++) {
    const size = 2;
    const radius = 5;
    const itemsCount = Math.ceil(2 * radius * Math.PI) / size;

    const x = radius * Math.cos((index * 2 * Math.PI) / itemsCount);
    const y = index * 0.4;
    const z = radius * -Math.sin((index * 2 * Math.PI) / itemsCount);

    const child: HNode = {
      keyframeAnimated: { loopBehaviour: "REVERSE" },
      children: [
        { prefabId: "en_p_footbridge_01" },
        { prefabId: "rope_railing_01", transform: { pos: [0, 0, 0.7] } },
        {
          keyframe: { timestamp: 0.1, easing: "LINEAR" },
          transform: { pos: [(index + 5) % 1, 0, 1] },
        },
        {
          keyframe: { timestamp: 3, easing: "EASE_OUT_EXPO" },
          transform: { pos: [4, 0.5 * index + 1, -4] },
        },
      ], //((index + 1) % 2)
      transform: {
        pos: [x, y, z],
        rot: [0, (index / itemsCount) * 360 + 90, 0],
      },
    };

    staircase.children?.push(child);
  }
  return staircase;
};

/**
 * Please see Example 1 for details about setting up hot reloading, scene construction et c
 */
const scene: Scene = {
  root: {
    transform: { pos: [0, 0, 0] },
    prefabId: "grass_plane_01",
    children: [
      urn,
      urn1,
      urn2,
      urn3,
      bridge,
      relativeStaircaseBase,
      calculatedStaircaseBase,
      placeInCircleStaircaseBase,
      cubeSpiralBase,
      makeSpiral(),
      // Spawn point
      {
        prefabId: "gpl_spawn_point_01",
        transform: { pos: [9, 2, -10], rot: [0, 180, 0] },
      },
    ],
  },
  environment: "midday_01",
};

if (import.meta.hot) {
  import.meta.hot.accept(() => console.info("Hot reload: updated index.ts"));
}

renderScene(scene);
