/**
 * This example shows you how to create a simple Scene, with a simple animation,
 * and render it to a HTML element
 */

/**
 * The first thing to do is always to 'import' the things we will be using from code-kit
 */
import { renderScene, Scene, create } from '@hiberworld/code-kit';
import { portal } from '@hiberworld/code-kit-utils';

/**
 * Set up a desk, a chair and a cozy lantern, using pos, rot and scale...
 */
const desk = create('desk_01', { x: 10, y: 2, z: 3.5, rotY: 260 });
const chair = create('chair_01', { x: 9, y: 2, z: 3, rotY: 80 });
const lantern = create('en_p_lantern_02', { x: 9.9, y: 2.9, z: 2.5, rotY: 80, scale: 0.5 });

const spinningDesk = create({ y: 2 })
  .add(create('desk_01', { x: 3 }))
  .add(
    create({ prefabId: 'barrel_wood_01', x: 6 }).animate(
      { rotY: [0, -180, -360] },
      { easing: 'LINEAR', loop: 'RESTART' }
    )
  )
  .animate({ rotY: [0, 180, 360] }, { easing: 'LINEAR', loop: 'RESTART' });

const test = create('ancient_urn_01', { y: 3, z: 10 })
  .add(create('apple_tree_01_t2', { x: 10 }))
  .add(
    create('balloon_01')
      .add(
        create()
          .animate({ rotY: [0, -180, -360] }, { duration: 4, loop: 'RESTART', easing: 'LINEAR' })
          .addMany(10, index => create({ rotY: index * 36 }).add(create('armchair_01', { x: 4 })))
      )
      .animate({ y: [0, 4, 0] }, { duration: 3 })
  )
  .animate(
    {
      rotZ: [0, 70],
      x: [0, 20],
    },
    { duration: 3 }
  );
/**
 * ... a bookshelf...
 */
const bookshelf = create('en_p_bookshelf', { x: 15, y: 2, z: 4, rotY: 260 });

/**
 * ... and put two animated stacks of books in it.
 */
const animatedBooks1 = create('books_01').animate(
  {
    x: [14.5, 10],
    y: [4.4, 2.8],
    rotY: [90, 0],
    z: [4, 4],
  },
  { duration: 2 }
);

const animatedBooks2 = create('books_01').animate(
  {
    x: [14.5, 10],
    y: [4.4, 2.8],
    z: [4.2, 3.5],
    rotY: [0, 181],
  },
  { duration: 2 }
);

/**
 * Now put it all together by setting up a Scene,
 * with a big grass plane as the starting 'root object',
 * and add all the above objects to it.
 *
 * Use the transform prop to move the world one step down
 * so that the player is spawned above the ground
 *
 * We also set the environment to `midday_01`, but you can change
 * the environment by changing the string to something else
 */
const scene: Scene = {
  root: {
    transform: { pos: [0, -1, 0] },
    prefabId: 'grass_plane_01',
    children: [test, desk, spinningDesk, chair, lantern, bookshelf, animatedBooks1, animatedBooks2],
  },
  environment: 'midday_01',
};

/**
 * Last step is to take the Scene, with all the objects, and render it to the HTML page
 * (Take a look at the companion index.html to see the definition of HTML elements)
 *
 * The 'saveToFile: true' at the end of the line means we will save a scene.json which can be used
 * to upload the world later.
 */
renderScene(scene);
