import {
  renderScene,
  create,
  HNode,
  animations,
  Vec3,
} from "@hiberworld/code-kit";
import { RandomSeed } from "@hiberworld/code-kit-utils";

const world = create("smooth_rock_cylinder_01", { y: -1 });

/**
 * If you want to add an amount of organic variety to your scene, you can use
 * the 'RandomSeed' random series generator. This is guaranteed to always give
 * the same sequence of numbers, and will reset to give the same sequence on hot reload.
 */

const randomY = new RandomSeed(6).getValue(-4, 4);

/**
 * This example shows applying an image to an object.
 */
const hiberHeroImage =
  "https://images.ctfassets.net/jcfs1gimcmty/7mcRNmecRZ6zGobnQEUKhZ/e0c2bda3856279fe70eabd0dc2eb337b/hero.jpg?fm=jpg&q=75&fl=progressive";

const cliff = create("cliff_01_pillar", {
  transform: {
    pos: [7, randomY, 5],
  },

  remoteTexture: { textureUrl: hiberHeroImage },
});

world.add(cliff);

/**
 * This can be used to bring in generated images from outside,
 * which is handy if you want to add text signs, or generated content.
 */
const signText = "You can generate text as image.";
const textImageServiceUrl = `https://placehold.co/200x100/111/FFF/JPG?text=${signText}`;

const ratio = 16 / 9;
const scale: Vec3 = [ratio, 1, 0.001];

const signWithText = create("cube_01", {
  remoteTexture: { textureUrl: textImageServiceUrl },
  name: "Image Cube Example",
  transform: {
    scale,
  },
  z: 1,
  y: 4,
  rotY: 0,
});

world.add(signWithText);

create("sign_arrow_01", {
  y: 2,
  rotY: 180,
  z: 1,
  infoPanel: {
    header: "Header",
    preBody: "Pre body: ",
    body: "This is the body text",
    url: "https://hiberworld.github.io/codekit",
    isOpenInOverlayEnabled: true,
    isOpenInNewTabEnabled: true,
  },
}).addTo(world);

const glbDoll: HNode = {
  transform: { pos: [0, 4, 0] },
  glb: "https://d1a370nemizbjq.cloudfront.net/f01afd2c-e487-4309-8c5f-ef1fa6c2b59d.glb",

  skinnedAnimation: {
    animationID: animations.an_default_backflip.id,
    skeletonGroupID: "skg_rpm_female",
  },
};

cliff.add(glbDoll);

renderScene({
  root: world,
  environment: "planet_01",
});
