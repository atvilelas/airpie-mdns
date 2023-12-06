import path from 'path';
import { fileURLToPath } from 'url';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: './src/index.ts',
  target: ['node', 'es2020'],
  output: {
    module: true,
    library: { type: 'module' },
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /src(.*)\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    concatenateModules: false,
  },
  plugins: [new BundleAnalyzerPlugin({ reportFilename: '../bundle.html', analyzerMode: 'static' })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  experiments: {
    outputModule: true,
  },
};
