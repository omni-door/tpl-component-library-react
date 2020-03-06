export default function (config: {
  name: string;
  ts: boolean;
}) {
  const { name, ts } = config;
  return `'use strict';

module.exports = {
  title: '${name}',
  typescript: ${ts ? true : false},
  src: './src/',
  files: '**/*.{md,markdown,mdx}',
  port: 6200
};`;
}

