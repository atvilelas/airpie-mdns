import path from 'path';

const __dirname = path.dirname('webpack.config.js');
export default {
  devtool: 'source-map',
  target: 'node',
  module: {
    rules: [
      { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          instance: 'esm',
          configFile: 'tsconfig.json',
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
};
