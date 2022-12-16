import {defineConfig} from 'vite';
import {getOcularConfig} from '../helpers/get-ocular-config';
import {createHtmlPlugin} from 'vite-plugin-html';
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill';
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill';

const ocularConfig = getOcularConfig();

export default defineConfig(({mode}) => {
  return {
    plugins: [
      createHtmlPlugin({
        minify: false,
        entry: ocularConfig.entry[`${mode}-browser`]
      })
    ],
    optimizeDeps: {
      // Polyfill for Node environment (required by tape-promise)
      esbuildOptions: {
        define: {
          global: 'globalThis',
          __dirname: '"."'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
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
