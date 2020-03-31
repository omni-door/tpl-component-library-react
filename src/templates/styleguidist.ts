import { STYLE } from '@omni-door/utils';

export default function (config: {
  ts: boolean;
  style: STYLE;
}) {
  const { ts, style } = config;

  return `'use strict';

const path = require('path')
const { version } = require('./package')

module.exports = {
  components: 'src/components/[A-Z]*/index.ts',
  defaultExample: true,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: ${
    ts
      ? 'require(\'react-docgen-typescript\').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse'
      : '(filePath, source, resolver, handlers) => require(\'react-docgen\').parse(source, resolver, handlers)'
  },
  moduleAliases: {
		'rsg-example': path.resolve(__dirname, 'src'),
	},
  ribbon: {
    url: '',
    text: 'Fork me on GitLab'
  },
  version,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          loader: 'babel-loader',
					exclude: /node_modules/
        },
        ${style ? (style === 'css' ? `{
          test: /\\.css$/,
          use:  ['style-loader', 'css-loader']
        }
        ` : style === 'less' ? `{
          test: /\\.(css|less)$/,
          use: ['style-loader', 'css-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }]
        },` : style === 'scss' ? `{
          test: /\\.(css|scss|sass)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }` : `{
          test: /\\.css$/,
          use:  ['style-loader', 'css-loader']
        },{
          test: /\\.less$/,
          use: ['style-loader', 'css-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }]
        },
        {
          test: /\.(scss|sass)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }`) : ''}
      ]
    },
    resolve: {
      extensions: [${ts ? '".ts", ".tsx", ' : ''}".js", ".jsx", ${style ? (style === 'css' ? '".css"' : (style === 'less' ? '".less", ".css"' : style === 'scss' ? '".scss", ".css", ".sass"' : '".scss", ".less", ".css", ".sass"')) : ''}]
    }
  }
}
`;
}

