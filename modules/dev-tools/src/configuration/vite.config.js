import {defineConfig} from 'vite';
import {getOcularConfig} from '../helpers/get-ocular-config.js';
import {createHtmlPlugin} from 'vite-plugin-html';
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill';
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig(async ({mode}) => {
  const ocularConfig = await getOcularConfig({aliasMode: 'browser'});
  const entryPoint = ocularConfig.entry[`${mode}-browser`];

  return {
    plugins: entryPoint.endsWith('.html')
      ? []
      : [
          // If entry is a js/ts file, create a virtual html
          createHtmlPlugin({
            minify: false,
            entry: ocularConfig.entry[`${mode}-browser`]
          })
        ],
    optimizeDeps: {
      // Disable crawling the whole repo
      entries: entryPoint.endsWith('.html') ? [entryPoint] : [],
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
