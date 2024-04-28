import {register} from 'node:module';

register('ts-node/esm', import.meta.url);
register('./esm-alias.js', import.meta.url);
