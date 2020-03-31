import { STYLE } from '@omni-door/utils';

export default function (config: {
  style: STYLE;
}) {
  const { style } = config;
  let gatsbyPlugin = [];
  switch (style) {
    case 'less':
      gatsbyPlugin.push('gatsby-plugin-less');
      break;
    case 'scss':
      gatsbyPlugin.push('gatsby-plugin-sass');
      break;
    case 'all':
      gatsbyPlugin.push('gatsby-plugin-less', 'gatsby-plugin-sass');
      break;
  }

  return `'use strict';

module.exports = {
  plugins: [
    'gatsby-theme-docz',
    ${gatsbyPlugin.length > 0 ? `'${gatsbyPlugin.join('\',\n    \'')}'` : ''}
  ]
};`;
}

