import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import pegjs from 'rollup-plugin-pegjs';

const pkg = require('./package.json');

export default {
  entry: 'src/lib/index.js',
  plugins: [
    pegjs({
      optimize: (process.env.PEGJS_OPTIMIZE || 'speed')
    }),
    babel(
      babelrc()
    )
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'cjs',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
};
