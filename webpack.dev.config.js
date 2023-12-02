import { merge } from 'webpack-merge';
import base from './webpack.base.config.js';

export default merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
});
