import { renderScene, create } from '@hiberworld/code-kit';

const world = create('grass_plane_01');

create('sphere_01', {
  y: 3,
  x: -3,
  z: 5,
  signalSource: {
    id: 'sphere1',
    lookAtSensor: true,
  },
}).addTo(world);

create('cube_01', {
  y: 3,
  x: 3,
  z: 5,
  signalSource: {
    id: 'sphere2',
    lookAtSensor: true,
  },
}).addTo(world);

create('en_m_log_cabin_01_wall', {
  y: 6,
  z: 10,
  signalListener: {
    target: {
      type: 'OR',
      input1: 'sphere1',
      input2: 'sphere2',
    },
    invisibleOnSignal: true,
  },
}).addTo(world);

renderScene({ root: world, environment: 'midday_01' });
