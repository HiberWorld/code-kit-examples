import {
  animations,
  HNode,
  materials,
  renderScene,
  Scene,
  Vec3,
} from "@hiberworld/code-kit";

const hiberHeroImage =
  "https://images.ctfassets.net/jcfs1gimcmty/7mcRNmecRZ6zGobnQEUKhZ/e0c2bda3856279fe70eabd0dc2eb337b/hero.jpg?fm=jpg&q=75&fl=progressive";

/**
 * Instead of using prefabs, you can render meshes directly.
 */
const sphere: HNode = {
  transform: { pos: [0, 5, 0] },
  remoteTexture: { textureUrl: hiberHeroImage },
  rendering: { meshID: "en_b_sphere_01" },
};

/**
 * Some avatars are also available as meshes;
 * useful if you want to populate the scene with non-player characters or statues
 */
const statue: HNode = {
  transform: { pos: [3, 3, -4] },
  rendering: { meshID: "ch_pl_gaia_01", materialID: "t_stone_floor_01" },
};

const npc: HNode = {
  transform: { pos: [5, 3, -4] },
  rendering: {
    meshID: "ch_pl_gaia_01",
    materialID: "ch_pl_gaia_01_t1" as keyof typeof materials,
  },
  keyframeAnimated: { loopBehaviour: "REVERSE" },
  children: [
    {
      keyframe: { timestamp: 0.1, easing: "EASE_IN_OUT_CUBIC" },
      transform: { pos: [0, 0.3, 0] },
    },
    {
      keyframe: { timestamp: 0.9, easing: "LINEAR" },
      transform: { pos: [0.2, 0, 0.2] },
    },
  ],
};

/**
 * You can apply animations to meshes. All built-in animations are available in the 'animations' collection.
 * Make sure you supply the right skeleton for your animation.
 */
const animation = animations.an_default_backflip;

const imageDoll: HNode = {
  transform: { pos: [7, 2, -4] },
  remoteTexture: {
    textureUrl: hiberHeroImage,
  },
  rendering: { meshID: "ch_pl_gaia_01" },
  skinnedAnimation: {
    animationID: animation.id,
    skeletonGroupID: animation.skeletonGroupID,
  },
};

/**
 * You can even use animation for external '.glb' meshes.
 * At the moment, there are only skeleton groups available for Hiber avatars and
 * Ready Player Me avatars, so make sure that you specify the correct skeleton
 * for the GLB and corresponding and correctly cased skeletonGroupId for the animation.
 */
const glbDoll: HNode = {
  transform: { pos: [7, 2, -6] },
  glb: "https://d1a370nemizbjq.cloudfront.net/f01afd2c-e487-4309-8c5f-ef1fa6c2b59d.glb",

  skinnedAnimation: {
    animationID: animation.id,
    skeletonGroupID: "skg_rpm_female",
  },
};

/**
 * You can even add an image to large images, like a ground plane.
 *
 * Here we add it directly to the root object to give the impression of water.
 */

const root: HNode = {
  prefabId: "grass_plane_01",
  transform: {
    pos: [0, -2, 0],
  },
  remoteTexture: {
    textureUrl:
      "https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg",
  },
  children: [sphere, statue, npc, imageDoll, glbDoll],
};

/**
 * Please see Example 1 for details about setting up hot reloading, scene construction et c
 */
const scene: Scene = {
  environment: "above_clouds_01",
  root,
};

renderScene(scene);
