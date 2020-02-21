import { getDependency, arr2str, STYLE, DEVSERVER, STRATEGY } from '@omni-door/tpl-common';
import { dependencies as dependenciesMap, devDependencies as devDependenciesMap } from './dependencies_stable_map';

interface Config {
  ts: boolean;
  test: boolean;
  eslint: boolean;
  commitlint: boolean;
  style: STYLE;
  stylelint: boolean;
  devServer: DEVSERVER;
}

export function dependencies (strategy: STRATEGY) {
  const dependency = getDependency(strategy, dependenciesMap);
  const deps = [
    dependency('react'),
    dependency('react-dom')
  ];
  return {
    depArr: [ ...deps ],
    depStr: arr2str(deps)
  };
}

export function devDependencies (strategy: STRATEGY, config: Config) {
  const dependency = getDependency(strategy, devDependenciesMap);

  const {
    ts,
    test,
    eslint,
    commitlint,
    style,
    stylelint,
    devServer
  } = config;

  const loaderDependencies = [
    dependency('babel-loader'),
    style ? dependency('style-loader') : '',
    style ? dependency('css-loader') : '',
    (style === 'all' || style === 'less') ? dependency('less') : '',
    (style === 'all' || style === 'less') ? dependency('less-loader') : '',
    (style === 'all' || style === 'scss') ? dependency('sass-loader') : '',
    (style === 'all' || style === 'scss') ? dependency('node-sass') : '',
    dependency('url-loader'),
    dependency('file-loader')
  ];

  const babelDependencies = [
    dependency('@babel/core'),
    dependency('@babel/preset-env'),
    dependency('@babel/preset-react'),
    ts ? dependency('@babel/preset-typescript') : ''
  ];

  const testDependencies = test ? [
    dependency('enzyme'),
    dependency('enzyme-adapter-react-16'),
    dependency('jest'),
    dependency('jest-transform-stub')
  ] : [];

  const testTypesDependencies = test ? [
    dependency('@types/jest'),
    dependency('@types/enzyme'),
    dependency('@types/enzyme-adapter-react-16'),
    dependency('ts-jest')
  ] : [];

  const tsDependencies = ts ? [
    dependency('@types/react'),
    dependency('@types/react-dom'),
    dependency('typescript'),
    dependency('ts-node'),
    dependency('ts-loader'),
    ...testTypesDependencies
  ] : [];

  const eslintDependencies = eslint ? [
    dependency('eslint'),
    dependency('eslint-plugin-react'),
    ts ? dependency('@typescript-eslint/eslint-plugin') : '',
    ts ? dependency('@typescript-eslint/parser') : ''
  ] : [];

  const commitlintDependencies = commitlint ? [
    dependency('@commitlint/cli'),
    dependency('husky'),
    dependency('lint-staged')
  ] : [];

  const stylelintDependencies = stylelint ? [
    dependency('stylelint'),
    dependency('stylelint-config-standard'),
    dependency('stylelint-config-standard'),
    dependency('stylelint-config-css-modules'),
    dependency('stylelint-config-rational-order'),
    dependency('stylelint-config-prettier'),
    dependency('stylelint-order'),
    dependency('stylelint-declaration-block-no-ignored-properties'),
    style === 'all' || style === 'scss' ? dependency('stylelint-scss') : ''
  ] : [];

  const doczDependencies= [
    dependency('docz'),
    dependency('docz-theme-default'),
    dependency('docz-plugin-css'),
    dependency('react-hot-loader'),
    ts ? dependency('@types/vfile-message') : ''
  ];

  const storybookDependencies= [
    dependency('@storybook/react'),
    dependency('@storybook/addons'),
    dependency('@storybook/addon-options'),
    dependency('@storybook/addon-actions'),
    dependency('@storybook/addon-docs'),
    dependency('@storybook/addon-info'),
    dependency('@storybook/addon-knobs'),
    dependency('@storybook/addon-links'),
    dependency('@storybook/addon-notes'),
    dependency('awesome-typescript-loader'),
    dependency('react-docgen-typescript-loader'),
    dependency('storybook-readme'),
    ...loaderDependencies,
    ...babelDependencies
  ];

  const bishengDependencies = [
    dependency('bisheng'),
    dependency('bisheng-theme-one'),
    dependency('bisheng-plugin-react'),
    ts ? dependency('@types/vfile-message') : ''
  ];

  let devServerDependencies: string[] = [];
  switch(devServer) {
    case 'docz':
      devServerDependencies = doczDependencies;
      break;
    case 'storybook':
      devServerDependencies = storybookDependencies;
      break;
    case 'bisheng':
      devServerDependencies = bishengDependencies;
      break;
  }

  const defaultDep = [
    dependency('@omni-door/cli'),
    dependency('del')
  ];

  return {
    devDepArr: [
      ...defaultDep,
      ...tsDependencies,
      ...testDependencies,
      ...eslintDependencies,
      ...commitlintDependencies,
      ...stylelintDependencies,
      ...devServerDependencies
    ],
    defaultDepArr: defaultDep,
    defaultDepStr: arr2str(defaultDep),
    tsDepArr: tsDependencies,
    tsDepStr: arr2str(tsDependencies),
    testDepArr: testDependencies,
    testDepStr: arr2str(testDependencies),
    eslintDepArr: eslintDependencies,
    eslintDepStr: arr2str(eslintDependencies),
    commitlintDepArr: commitlintDependencies,
    commitlintDepStr: arr2str(commitlintDependencies),
    stylelintDepArr: stylelintDependencies,
    stylelintDepStr: arr2str(stylelintDependencies),
    devServerDepArr: devServerDependencies,
    devServerDepStr: arr2str(devServerDependencies)
  };
}
