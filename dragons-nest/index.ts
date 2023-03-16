import {
  renderScene,
  HNode,
  materials,
  RandomSeed,
} from "@hiberworld/code-kit";
import { create } from "@hiberworld/code-kit-utils";

const world: HNode = {};
const floor = create("rock_pile_01_t2", { y: -1 });

world.children = [floor];

const random = new RandomSeed();

//ISLANDS
//First row
for (let i = 0; i < 8; i++) {
  const randomPosY = random.getValue(0.5, 1.5);

  const island2 = create("rock_cube_01_t2", {
    x: i * 8,
    y: -1,
    rotY: Math.random() * 360,
    scale: 2,
  }).moveY([0, randomPosY], { duration: 4, easing: "EASE_IN_OUT_QUAD" });
  if (i % 5 == 0) {
    create({
      signaller: { value: 100 },
      triggerBox: { size: [1, 1, 1] },
      y: 4,
      x: i * 8,
      checkpoint: {},
    }).addTo(island2);
  }

  floor.children?.push(island2);
}

//Big rock
const sphere: HNode = {
  prefabId: "sphere_01",
  material: "t_rock_03",
  transform: {
    pos: [-50, 85, 0],
    scale: [90, 90, 90],
  },
};
world.children?.push(sphere);
//Fireflies
for (let i = 0; i < 8; i++) {
  const firefly: HNode = {
    prefabId: "particle_jar_of_fireflies_01",
    transform: {
      pos: [0 + i * 8, 2, 0],
      scale: [2, 2, 2],
    },
  };

  floor.children?.push(firefly);
}

//Falling rocks with damage
for (let i = 0; i < 180; i++) {
  const randomScale = random.getValue(0.2, 1.5);
  const randomPosX = random.getValue(10, 100);
  const randomPosY = random.getValue(60, 160);
  const randomPosZ = random.getValue(0, 100) - 50;
  const fallingDamage: HNode = {
    prefabId: "rock_01_t1",
    material: "t_rock_03",
    dealDamageOnTouch: {},
    transform: {
      pos: [randomPosX, randomPosY, randomPosZ],
      rot: [0, Math.random() * 360, 0],
      scale: [randomScale, randomScale, randomScale],
    },
  };
  const animatedDamage: HNode = {
    keyframeAnimated: {
      loopBehaviour: "RESTART",
    },
    children: [
      fallingDamage,
      {
        keyframe: { easing: "EASE_IN_OUT_QUAD", timestamp: 0 },
        transform: { pos: [0, 20, 0] },
      },
      {
        keyframe: { easing: "EASE_IN_OUT_QUAD", timestamp: 6 },
        transform: { pos: [0, -250, 0] },
      },
    ],
  };
  floor.children?.push(animatedDamage);
}
//Tree

const tree1 = create("jungle_tree_large", {
  x: 125,
  y: -8,
  z: 0,
  scaleX: 8,
  scaleY: 4,
  scaleZ: 8,
})
  .addMany(30, (index, total) =>
    create({
      x: random.getValue(5, 9),
      y: random.getValue(5, 25),
      scale: random.getValue(0.1, 0.4),
      prefabId: "rock_01_t1",
      material: "t_rocky_sand_01",
    })
      .rotateY((360 / total) * index)
      .rotateY([0, 180, 360], {
        loop: "RESTART",
        easing: "LINEAR",
        duration: 12,
      })
  )
  .addMany(50, (index, total) =>
    create({
      x: -8,
      y: 2 + index * 0.7,
      z: 0,
      prefabId: "rock_cube_01_t2",
      scaleY: 0.3,
      scaleX: 0.2,
      scaleZ: 0.2,
    })
      .add(
        index % 5 == 0
          ? create({
              y: 2.7,
              scaleY: 2,
              scaleX: 2,
              scaleZ: 2,
              signaller: { value: 100 },
              triggerBox: { size: [2, 2, 2] },
              checkpoint: {},
            })
          : create()
      )
      .rotateY((320 / total) * index)
  )
  .add(
    create({
      prefabId: "smooth_rock_02",
      rotX: 180,
      y: 36.5,
      x: -3,
      z: -3,
      material: "t_rock_01",
    })
  );
//FIREBALL
const fireball = (direction: number) =>
  create()
    .moveZ([0.5, 40], { duration: 2, loop: "RESTART", easing: "LINEAR" })
    .add(
      create({
        prefabId: "sphere_01",
        scale: 0.3,
        material: "t_lava_01",
        signalListener: { target: "head" },
        invisibleOnSignal: {},
      }),
      create("fx_particlesystem_fire_01", { scale: 1.5 })
    )
    .rotateY(direction);

//DRAGON
const dragon = create({})
  .addMany(20, (index, total) => {
    if (index === 0) {
      const head = create({
        prefabId: "en_p_jaguar_head_01_t1",
        material: "t_gore_01",
        signalListener: { target: "head" },
        invisibleOnSignal: {},
        signalSource: {},
        name: "head",
        signalSwitch: {},
        interactible: {},
        spawnPrefabOnSignal: { prefabID: "collectible_mandatory_key_01" },
      })
        .animate(
          { rotY: [-45, 45] },
          { duration: 2, easing: "EASE_IN_OUT_QUAD", startAt: -0.4 }
        )
        .animate(
          { x: [-3, 3] },
          {
            duration: 2,
            easing: "EASE_IN_OUT_QUAD",
            startAt: (2 / total) * index,
          }
        )
        .add(fireball(-15), fireball(0), fireball(15));

      return head;
    }
    return create("half_sphere_01", {
      prefabId: "sphere_01",
      material: "t_gore_01",
      signalListener: { target: "head" },
      invisibleOnSignal: {},
      scale: 0.7,
    })
      .moveZ(-1 * index)
      .animate(
        { x: [-3, 3] },
        {
          duration: 2,
          easing: "EASE_IN_OUT_QUAD",
          startAt: (2 / total) * index,
        }
      );
  })
  .moveY(3)
  .moveX(20)
  .rotateY([0, -180, -360], {
    duration: 20,
    loop: "RESTART",
    easing: "LINEAR",
  });
const movedDragon = create({
  z: -30,
  x: 70,
  y: 135,
  scale: 1.5,
}).add(dragon);

const button = create("desk_01", {
  z: -30,
  x: 100,
  y: 140,
  scale: 1,
  signalListener: { target: "head" },
  invisibleOnSignal: {},
  signalSource: {},
  name: "spawnDragon",
  signalSwitch: {},
  interactible: {},
});

world.children?.push(tree1, movedDragon, button);

//Falling rocks under tree
for (let i = 0; i < 100; i++) {
  const randomScale = 3 + Math.random() * 10;
  const rockPile: HNode = {
    prefabId: "rock_pile_01_t2",
    transform: {
      pos: [
        100 + Math.random() * 70,
        -30 - Math.random() * 200,
        -60 + Math.random() * 100,
      ],
      scale: [randomScale, randomScale, randomScale],
      rot: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
    },
  };
  floor.children?.push(rockPile);
}

renderScene(
  "canvas",
  {
    root: world,
    environment: "planet_01",
  },
  { saveToFile: true }
);
