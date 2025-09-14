import merge from "lodash/merge";

import defaultConfig from "./cfg.default";
import localConfig from "./cfg.local";
import mockConfig from "./cfg.mock";
import productionConfig from "./cfg.production";
import testConfig from "./cfg.test";
const configs: { [key: string]: {} } = {
  mock: mockConfig,
  local: localConfig,
  test: testConfig,
  production: productionConfig,
};

let env = "production";
if (import.meta.env.MODE === "development") {
  env = "local";
}
console.log("Current env:", env);
const config = merge(defaultConfig, configs[env]);
export default config;
