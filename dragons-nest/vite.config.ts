import { defineConfig, Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

const SaveSceneOnRenderPlugin: Plugin = {
  name: 'save-scene-on-render',
  configureServer(server) {
    return () => {
      server.middlewares.use('/save', async (req, res) => {
        const ws = fs.createWriteStream(path.join(__dirname, 'scene.json'));
        req.pipe(ws);
        res.statusCode = 200;
        res.end('World saved!');
      });
    };
  },
};

const AutoHMRPlugin: Plugin = {
  name: 'auto-hmr',
  transform(code, id, options) {
    if ((options?.ssr && !process.env.VITEST) || id.includes('node_modules')) return;

    if (!code.match(/renderScene/)) {
      return code;
    }

    const hmrFooter = `
      if (import.meta.hot) {
        import.meta.hot.accept(() => console.info('Hot reload: updated ${path.basename(id)}'));
      }
    `;

    return `${code}\n${hmrFooter}`;
  },
};

export default defineConfig({
  plugins: [SaveSceneOnRenderPlugin, AutoHMRPlugin],
});
