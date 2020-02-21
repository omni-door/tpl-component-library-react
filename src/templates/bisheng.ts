export default function (config: {
  name: string;
}) {
  const { name } = config;
  return `'use strict';

const path = require('path');

module.exports = {
  port: 6200,
  root: '/bisheng/',
  theme: 'bisheng-theme-one',
  themeConfig: {
    home: '/',
    sitename: '${name}',
    tagline: 'THE OMNI PROJECT',
    github: '',
  },
  plugins: ['bisheng-plugin-react?lang=jsx']
};`;
}

