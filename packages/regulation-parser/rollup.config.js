import babel from 'rollup-plugin-babel';
import pegjs from 'rollup-plugin-pegjs';

const pkg = require('./package.json');

export default {
  entry: 'src/lib/index.js',
  plugins: [
    pegjs({
      optimize: (process.env.PEGJS_OPTIMIZE || 'speed')
    }),
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-1']
    })
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
