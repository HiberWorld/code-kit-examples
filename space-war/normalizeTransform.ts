import {
  Vec3,
  scaleToVec3,
  Rotation,
  quaternionToEuler,
} from "@hiberworld/code-kit";
import { SugaredTransform } from "@hiberworld/code-kit/dist/traverse/sugar/TransformSugar";

export const rotToVec3 = (val: Rotation | undefined): Vec3 | undefined => {
  if (typeof val === "undefined") {
    return;
  }

  if (val.length === 4) {
    return quaternionToEuler(val);
  }

  return val;
};

const desugar = (
  sugar?: Vec3,
  transform?: Vec3,
  v0?: number,
  v1?: number,
  v2?: number
): Vec3 | undefined => {
  if (
    typeof v0 === "undefined" &&
    typeof v1 === "undefined" &&
    typeof v2 === "undefined" &&
    typeof sugar === "undefined" &&
    typeof transform === "undefined"
  )
    return;

  const result = sugar ?? transform ?? [0, 0, 0];

  if (v0 !== undefined) result[0] = v0;
  if (v1 !== undefined) result[1] = v1;
  if (v2 !== undefined) result[2] = v2;

  return result;
};

export const normalizeTransform = <T>(
  input: (SugaredTransform & T) | undefined
) => {
  if (typeof input === "undefined") return { props: {} };

  const {
    x,
    y,
    z,
    rotX,
    rotY,
    rotZ,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    p,
    r,
    s,
    transform,
    ...props
  } = input;

  return {
    props,

    p: desugar(p, transform?.pos, x, y, z),
    r: desugar(rotToVec3(r), rotToVec3(transform?.rot), rotX, rotY, rotZ),
    s: desugar(
      scaleToVec3(s),
      scaleToVec3(transform?.scale),
      scaleX,
      scaleY,
      scaleZ
    ),
  };
};
