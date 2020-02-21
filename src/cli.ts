import { parse } from 'path';
import init from './index';
const args = process.argv.slice(2);

if (args.length > 0) {
  const options: { [key: string]: string | boolean } = {
    strategy: 'stable',
    projectName: parse(process.cwd()).name,
    initPath: process.cwd(),
    devServer: 'docz',
    test: false,
    eslint: true,
    commitlint: false,
    style: 'scss',
    stylelint: true,
    pkgtool: 'yarn'
  };
  for (let i = 0; i < args.length; i++) {
    const item = args[i];
    const [ k, val ] = item.split('=');
    options[k] = val === 'true'
      ? true
      : val === 'false'
        ? false
        : val;
  }
  init(options as any);
}