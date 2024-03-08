import {defineConfig} from 'vite';
import {getOcularConfig} from '../helpers/get-ocular-config.js';
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill';
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig(async ({mode}) => {
  const ocularConfig = await getOcularConfig({aliasMode: 'browser'});
  const entryPoint = ocularConfig.entry[`${mode}-browser`];

  return {
    optimizeDeps: {
      // Disable crawling the whole repo
      entries: [entryPoint],
      // Polyfill for Node environment (required by tape-promise)
      esbuildOptions: {
        define: {
          global: 'globalThis',
          __dirname: '"."'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true
          }),
          NodeModulesPolyfillPlugin()
        ]
      }
    },
    resolve: {
      alias: ocularConfig.aliases
    }
  };
});
