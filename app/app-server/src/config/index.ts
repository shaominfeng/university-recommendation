import merge from 'lodash.merge';

import defaultConfig from './cfg.default';
import localConfig from './cfg.local';
import productionConfig from './cfg.production';
import testConfig from './cfg.test';
import mockConfig from './cfg.mock';

const configs: { [key: string]: {} } = {
  mock: mockConfig,
  local: localConfig,
  test: testConfig,
  production: productionConfig,
};
const env: string = process.env.NODE_ENV;
export default () => merge(defaultConfig, configs[env]);
