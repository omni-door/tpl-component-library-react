import {
  babel,
  commitlint,
  eslint,
  eslintignore,
  gitignore,
  jest,
  npmignore,
  omni,
  pkj,
  readme,
  stylelint,
  tsconfig
} from '@omni-door/tpl-common';
import source_index from './source/index';
import source_d from './source/declaration';
import storybook_addons from './.storybook/addons';
import storybook_config from './.storybook/config';
import storybook_mhead from './.storybook/manager-head';
import storybook_webpack from './.storybook/webpack';
import bisheng from './bisheng';
import posts_readme from './posts/readme';
import doczrc from './doczrc';
import mdx from './mdx';

export {
  babel,
  commitlint,
  eslint,
  eslintignore,
  gitignore,
  jest,
  npmignore,
  omni,
  pkj,
  readme,
  stylelint,
  tsconfig
} from '@omni-door/tpl-common';
export { default as source_index } from './source/index';
export { default as source_d } from './source/declaration';
export { default as storybook_addons } from './.storybook/addons';
export { default as storybook_config } from './.storybook/config';
export { default as storybook_mhead } from './.storybook/manager-head';
export { default as storybook_webpack } from './.storybook/webpack';
export { default as bisheng } from './bisheng';
export { default as posts_readme } from './posts/readme';
export { default as doczrc } from './doczrc';
export { default as mdx } from './mdx';

const tpls = {
  babel,
  commitlint,
  eslint,
  eslintignore,
  gitignore,
  jest,
  npmignore,
  omni,
  pkj,
  readme,
  stylelint,
  tsconfig,
  source_index,
  source_d,
  storybook_addons,
  storybook_config,
  storybook_mhead,
  storybook_webpack,
  doczrc,
  bisheng,
  posts_readme,
  mdx
};

export type TPLS_INITIAL = {
  [T in keyof typeof tpls]: typeof tpls[T];
};

export type TPLS_INITIAL_FN = TPLS_INITIAL[keyof TPLS_INITIAL];

export type TPLS_INITIAL_RETURE = Partial<TPLS_INITIAL>;

export default tpls;