import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  plugins: [
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
