import path from 'path';
import {
  arr2str,
  intersection,
  PKJTOOL,
  STYLE,
  STRATEGY,
  DEVSERVER
} from '@omni-door/tpl-common';
import {
  babel as babelConfigJs,
  commitlint as commitlintConfigJs,
  eslint as eslintrcJS,
  eslintignore,
  gitignore,
  jest as jestConfigJs,
  npmignore,
  omni as omniConfigJs,
  pkj as packageJson,
  readme as readMe,
  stylelint as stylelintConfigJs,
  tsconfig as tsConfigJson,
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
  TPLS_INITIAL,
  TPLS_INITIAL_FN,
  TPLS_INITIAL_RETURE
} from './templates';
import { dependencies, devDependencies } from './configs/dependencies';
import {
  exec,
  logErr,
  logWarn,
  output_file,
  logSuc
} from '@omni-door/tpl-utils';

const default_tpl_list = {
  babel: babelConfigJs,
  commitlint: commitlintConfigJs,
  eslint: eslintrcJS,
  eslintignore,
  gitignore,
  jest: jestConfigJs,
  npmignore,
  omni: omniConfigJs,
  pkj: packageJson,
  readme: readMe,
  stylelint: stylelintConfigJs,
  tsconfig: tsConfigJson,
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
};

export type ResultOfDependencies = string[] | { add?: string[]; remove?: string[]; };

export type InitOptions = {
  strategy: STRATEGY;
  projectName: string;
  initPath: string;
  configFileName?: string;
  devServer: DEVSERVER;
  test: boolean;
  eslint: boolean;
  commitlint: boolean;
  style: STYLE;
  stylelint: boolean;
  pkgtool?: PKJTOOL;
  isSlient?: boolean;
  tpls?: (tpls: TPLS_INITIAL) => TPLS_INITIAL_RETURE;
  dependencies?: (dependecies_default: string[]) => ResultOfDependencies;
  devDependencies?: (devDependecies_default: string[]) => ResultOfDependencies;
  error?: (err: any) => any;
  success?: (results: any[]) => any;
};

async function init ({
  strategy = 'stable',
  projectName: name,
  initPath,
  configFileName = 'omni.config.js',
  devServer,
  test,
  eslint,
  commitlint,
  style,
  stylelint,
  tpls,
  pkgtool = 'yarn',
  isSlient,
  dependencies: dependencies_custom,
  devDependencies: devDependencies_custom,
  error = () => {
    logErr('组件库项目初始化失败！(The single-page-application initial has been occured some error!)');
    process.exit(1);
  },
  success = () => logSuc('组件库项目初始化完成！(The single-page-application initial has been completed!)')
}: InitOptions) {
  // reset illegal strategy
  let custom_tpl_list = {};
  try {
    custom_tpl_list = typeof tpls === 'function'
      ? tpls(default_tpl_list)
      : custom_tpl_list;

    for (const tpl_name in custom_tpl_list) {
      const name = tpl_name as keyof TPLS_INITIAL_RETURE;
      const list = custom_tpl_list as TPLS_INITIAL_RETURE;
      const tpl = list[name];
      const tplFactory = (config: any) => {
        try {
          return tpl && tpl(config);
        } catch (err) {
          logWarn(JSON.stringify(err));
          logWarn(`自定义模板 [${name}] 解析出错，将使用默认模板进行初始化！(The custom template [${name}] parsing occured error, the default template will be used for initialization!)`);    
        }

        return default_tpl_list[name](config);
      };

      (list[name] as TPLS_INITIAL_FN) = tplFactory as TPLS_INITIAL_FN;
    }
  } catch (err_tpls) {
    logWarn(JSON.stringify(err_tpls));
    logWarn('生成自定义模板出错，将全部使用默认模板进行初始化！(The custom template generating occured error, all will be initializated with the default template!)');
  }
  const tpl = { ...default_tpl_list, ...custom_tpl_list };
  const testFrame = 'jest';
  const ts = true;
  const build = 'tsc';
  const project_type = 'spa-react';

  // default files
  const content_omni = tpl.omni({
    project_type,
    build,
    ts,
    test,
    testFrame,
    eslint,
    commitlint,
    style,
    stylelint,
    mdx: false
  });
  const content_pkg = tpl.pkj({
    project_type,
    name,
    ts,
    devServer,
    testFrame,
    eslint,
    commitlint,
    stylelint,
    strategy
  });
  const content_gitignore = tpl.gitignore();
  const content_indexTpl = tpl.source_index();

  // tsconfig
  const content_ts = ts && tpl.tsconfig({ project_type });

  // d.ts files
  const content_d = ts && tpl.source_d({ style });

  // test files
  const content_jest = testFrame === 'jest' && tpl.jest({ ts });

  // lint files
  const content_eslintrc = eslint && tpl.eslint({ project_type, ts });
  const content_eslintignore = eslint && tpl.eslintignore();
  const content_stylelint = stylelint && tpl.stylelint({ style });
  const content_commitlint = commitlint && tpl.commitlint({ name });

  // build files
  const content_babel = devServer === 'storybook' && tpl.babel({ project_type, ts });

  // server files
  const content_bisheng = devServer === 'bisheng' && tpl.bisheng({ name });
  const content_postReadMe = devServer === 'bisheng' && tpl.posts_readme();
  const content_storybook_addons = devServer === 'storybook' && tpl.storybook_addons();
  const content_storybook_config = devServer === 'storybook' && tpl.storybook_config({ name });
  const content_storybook_mhead = devServer === 'storybook' && tpl.storybook_mhead({ name });
  const content_storybook_webpack = devServer === 'storybook' && tpl.storybook_webpack({ ts, style });
  const content_doczrc = devServer === 'docz' && tpl.doczrc({ name, ts, style });
  const content_doczmdx = devServer === 'docz' && tpl.mdx({ name });

  // ReadMe
  const content_readMe = tpl.readme({ name, configFileName });

  const pathToFileContentMap = {
    [`${configFileName}`]: content_omni,
    'package.json': content_pkg,
    '.gitignore': content_gitignore,
    [`src/components/index.${ts ? 'ts' : 'js'}`]: content_indexTpl,
    'src/@types/global.d.ts': content_d,
    'tsconfig.json': content_ts,
    'jest.config.js': content_jest,
    '.eslintrc.js': content_eslintrc,
    '.eslintignore': content_eslintignore,
    'stylelint.config.js': content_stylelint,
    'commitlint.config.js': content_commitlint,
    'babel.config.js': content_babel,
    'README.md': content_readMe,
    'src/index.mdx': content_doczmdx,
    'bisheng.config.js': content_bisheng,
    'posts/README.md': content_postReadMe,
    '.storybook/addons.js': content_storybook_addons,
    '.storybook/config.js': content_storybook_config,
    '.storybook/manager-head.html': content_storybook_mhead,
    '.storybook/webpack.config.js': content_storybook_webpack,
    'doczrc.js': content_doczrc
  }
  /**
   * create files
   */
  const file_path = (p: string) => path.resolve(initPath, p);
  for (const p in pathToFileContentMap) {
    output_file({
      file_path: file_path(p),
      file_content: pathToFileContentMap[p]
    });
  }

  let installCliPrefix = pkgtool === 'yarn' ? `${pkgtool} add --cwd ${initPath}` : `${pkgtool} install --save --prefix ${initPath}`;
  let installDevCliPrefix = pkgtool === 'yarn' ? `${pkgtool} add -D --cwd ${initPath}` : `${pkgtool} install --save-dev --prefix ${initPath}`;
  if (pkgtool === 'cnpm' && initPath !== process.cwd()) {
    installCliPrefix = `cd ${initPath} && ${installCliPrefix}`;
    installDevCliPrefix = `cd ${initPath} && ${installDevCliPrefix}`;
  }

  let {
    depArr,
    depStr
  } = dependencies(strategy);
  let dependencies_str = depStr;
  if (typeof dependencies_custom === 'function') {
    const result = dependencies_custom(depArr);
    if (result instanceof Array) {
      dependencies_str = `${depStr} ${arr2str(result)}`;
    } else {
      const { add = [], remove = [] } = result;
      for (let i = 0; i < remove.length; i++) {
        const item_rm = remove[i];
        depArr = [ ...intersection(depArr, depArr.filter(v => v !== item_rm)) ];
      }
      dependencies_str = `${arr2str(depArr)} ${arr2str(add)}`;
    }
  }

  const installCli = dependencies_str ? `${installCliPrefix} ${dependencies_str}` : '';
  let {
    defaultDepArr,
    defaultDepStr,
    tsDepArr,
    tsDepStr,
    testDepStr,
    testDepArr,
    eslintDepArr,
    eslintDepStr,
    commitlintDepArr,
    commitlintDepStr,
    stylelintDepArr,
    stylelintDepStr,
    devServerDepArr,
    devServerDepStr,
    devDepArr
  } = devDependencies(strategy, {
    ts,
    eslint,
    commitlint,
    style,
    stylelint,
    test: !!testFrame,
    devServer
  });

  let customDepStr;
  if (typeof devDependencies_custom === 'function') {
    const result = devDependencies_custom(devDepArr);
    if (result instanceof Array) {
      customDepStr = arr2str(result);
    } else {
      const { add = [], remove = [] } = result;
      for (let i = 0; i < remove.length; i++) {
        const item_rm = remove[i];
        defaultDepArr = [ ...intersection(defaultDepArr, defaultDepArr.filter(v => v !== item_rm)) ];
        tsDepArr = [ ...intersection(tsDepArr, tsDepArr.filter(v => v !== item_rm)) ];
        testDepArr = [ ...intersection(testDepArr, testDepArr.filter(v => v !== item_rm)) ];
        eslintDepArr = [ ...intersection(eslintDepArr, eslintDepArr.filter(v => v !== item_rm)) ];
        commitlintDepArr = [ ...intersection(commitlintDepArr, commitlintDepArr.filter(v => v !== item_rm)) ];
        stylelintDepArr = [ ...intersection(stylelintDepArr, stylelintDepArr.filter(v => v !== item_rm)) ];
        devServerDepArr = [ ...intersection(devServerDepArr, devServerDepArr.filter(v => v !== item_rm)) ];
      }
      defaultDepStr = arr2str(defaultDepArr);
      tsDepStr = arr2str(tsDepArr);
      testDepStr = arr2str(testDepArr);
      eslintDepStr = arr2str(eslintDepArr);
      commitlintDepStr = arr2str(commitlintDepArr);
      stylelintDepStr = arr2str(stylelintDepArr);
      devServerDepStr = arr2str(devServerDepArr);
      customDepStr = arr2str(add);
    }
  }

  const installDevCli = defaultDepStr ? `${installDevCliPrefix} ${defaultDepStr}` : '';
  const installTsDevCli = tsDepStr ? `${installDevCliPrefix} ${tsDepStr}` : '';
  const installTestDevCli = testDepStr ? `${installDevCliPrefix} ${testDepStr}` : '';
  const installEslintDevCli = eslintDepStr ? `${installDevCliPrefix} ${eslintDepStr}` : '';
  const installCommitlintDevCli = commitlintDepStr ? `${installDevCliPrefix} ${commitlintDepStr}` : '';
  const installStylelintDevCli = stylelintDepStr ? `${installDevCliPrefix} ${stylelintDepStr}` : '';
  const installServerDevCli = devServerDepStr ? `${installDevCliPrefix} ${devServerDepStr}` : '';
  const installCustomDevCli = customDepStr ? `${installDevCliPrefix} ${customDepStr}` : '';

  exec([
    installCli,
    installDevCli,
    installTsDevCli,
    installTestDevCli,
    installEslintDevCli,
    installCommitlintDevCli,
    installStylelintDevCli,
    installServerDevCli,
    installCustomDevCli
  ], success, error, isSlient);
}

export default init;