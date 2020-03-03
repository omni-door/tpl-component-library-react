import { PROJECT_TYPE, DEVSERVER, STRATEGY } from '@omni-door/tpl-utils';

export default (config: {
  project_type: PROJECT_TYPE;
  name: string;
  ts: boolean;
  devServer: DEVSERVER;
  test: boolean;
  eslint: boolean;
  commitlint: boolean;
  stylelint: boolean;
  strategy: STRATEGY;
  type_react?: string;
}) => {
  const { name, ts, devServer, test, eslint, commitlint, stylelint, strategy, type_react } = config;

  let devScript = '';
  let demoScript = '';
  const lowerName = name.toLowerCase();

  switch(devServer) {
    case 'docz':
      devScript = 'docz dev';
      demoScript = `docz build --base /${lowerName}`;
      break;
    case 'storybook':
      devScript = 'start-storybook -p 6200';
      demoScript = `build-storybook -c .storybook -o .${lowerName}`;
      break;
    case 'bisheng':
      devScript = 'bisheng start';
      demoScript = 'bisheng build';
      break;
  }

  return `{
  "name": "${lowerName}",
  "version": "0.0.1",
  "description": "",
  "main": "lib/index.js",
  "module": "es/index.js",
  "typings": "lib/index.d.ts",
  "scripts": {
    ${devScript ? `"start": "${devScript}",
    "dev": "${devScript}",` : ''}
    ${
      test
        ? `"test": "jest --passWithNoTests",
        "test:snapshot": "jest --updateSnapshot",`
        : ''
    }
    ${
      eslint || stylelint
        ? `"lint": "${
          eslint && stylelint
            ? 'npm run lint:es && npm run lint:style'
            : eslint
              ? 'npm run lint:es'
              : 'npm run lint:style'
          }",
          "lint:fix": "${
          eslint && stylelint
            ? 'npm run lint:es_fix && npm run lint:style_fix'
            : eslint
              ? 'npm run lint:es_fix'
              : 'npm run lint:style_fix'
          }",
          ${eslint ? `"lint:es": "eslint src/ --ext .${ts ? 'ts' : 'js'} --ext .${ts ? 'tsx' : 'jsx'}",
          "lint:es_fix": "eslint src/ --ext .${ts ? 'ts' : 'js'} --ext .${ts ? 'tsx' : 'jsx'} --fix",` : ''}
          ${stylelint ? `"lint:style": "stylelint src/**/*.{css,less,scss,sass} --allow-empty-input",
          "lint:style_fix": "stylelint src/**/*.{css,less,scss,sass} --fix",` : ''}`
      : ''
    }
    ${
      commitlint
        ? '"lint:commit": "commitlint -e $HUSKY_GIT_PARAMS",'
        : ''
    }
    "new": "omni new",
    "build": "omni build",
    ${
      demoScript
        ? `"build:demo": "${demoScript}",`
        : ''
    }
    "release": "omni release"
  },
  ${
  commitlint
    ? `"husky": {
        "hooks": {
          "pre-commit": "lint-staged",
          "pre-push": ${
            (eslint || stylelint) && test
              ? '"npm run lint && npm run test"'
              : (eslint || stylelint)
                  ? '"npm run lint"'
                  : test
                    ? '"npm run test"'
                    : ''},
          "commit-msg": "npm run lint:commit"
        }
      },
      "lint-staged": {
        ${eslint ? `"src/**/*.{js,jsx,ts,tsx}": [
          "npm run lint:es_fix"
        ]${eslint && stylelint ? ',' : ''}` : ''}
        ${stylelint ? `"src/**/*.{css,scss,sass,less}": [
          "npm run lint:style_fix"
        ]` : ''}
      },`
    : ''
}
  "keywords": [],
  "author": "",
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  ${
    type_react && ts && strategy === 'stable'
      ? `"resolutions": {
        "@types/react": "${type_react}"
      },`
      : ''
  }
  "license": "ISC"
}`;
};

