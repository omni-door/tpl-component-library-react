import babel from './babel';
import commitlint from './commitlint';
import eslint from './eslint';
import eslintignore from './eslintignore';
import gitignore from './gitignore';
import npmignore from './npmignore';
import jest from './jest';
import omni from './omni';
import pkj from './package';
import readme from './readme';
import tsconfig from './tsconfig';
import stylelint from './stylelint';
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
import component_class from './new/class_component';
import component_functional from './new/functional_component';
import component_index from './new/index';
import component_readme from './new/readme';
import component_stylesheet from './new/stylesheet';
import component_test from './new/test';
import component_mdx from './new/mdx';
import component_stories from './new/stories';

export { default as babel } from './babel';
export { default as commitlint } from './commitlint';
export { default as eslint } from './eslint';
export { default as eslintignore } from './eslintignore';
export { default as gitignore } from './gitignore';
export { default as npmignore } from './npmignore';
export { default as jest } from './jest';
export { default as omni } from './omni';
export { default as pkj } from './package';
export { default as readme } from './readme';
export { default as tsconfig } from './tsconfig';
export { default as stylelint } from './stylelint';
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
export { default as component_class } from './new/class_component';
export { default as component_functional } from './new/functional_component';
export { default as component_index } from './new/index';
export { default as component_readme } from './new/readme';
export { default as component_stylesheet } from './new/stylesheet';
export { default as component_test } from './new/test';
export { default as component_mdx } from './new/mdx';
export { default as component_stories } from './new/stories';

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
  mdx,
  component_class,
  component_functional,
  component_index,
  component_readme,
  component_stylesheet,
  component_test,
  component_mdx,
  component_stories
};

type TPLS = {
  [T in keyof typeof tpls]: typeof tpls[T];
};

export type TPLS_INITIAL = Omit<TPLS,
  'component_class' |
  'component_functional' |
  'component_index' |
  'component_readme' |
  'component_stylesheet' |
  'component_test' |
  'component_mdx' |
  'component_stories'
>;

export type TPLS_INITIAL_FN = TPLS_INITIAL[keyof TPLS_INITIAL];

export type TPLS_INITIAL_RETURE = Partial<TPLS_INITIAL>;

export type TPLS_NEW = Pick<TPLS,
  'component_class' |
  'component_functional' |
  'component_index' |
  'component_readme' |
  'component_stylesheet' |
  'component_test' |
  'component_mdx' |
  'component_stories'
>;

export type TPLS_NEW_FN = TPLS_NEW[keyof TPLS_NEW];

export type TPLS_NEW_RETURE = Partial<TPLS_NEW>;

export default tpls;