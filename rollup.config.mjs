import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';


const extensions = ['.js', '.ts' ,'.json'];

export default  {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/lib/bundles/bundle.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/lib/bundles/bundle.esm.min.js',
      format: 'esm',
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: 'lib/bundles/bundle.umd.js',
      format: 'umd',
      name: 'myLibrary',
      sourcemap: true
    },
    {
      file: 'lib/bundles/bundle.umd.min.js',
      format: 'umd',
      name: 'myLibrary',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    commonjs({
      include: 'node_modules/**'  ,
      defaultIsModuleExports:true
    }),
    nodeResolve({
      exportConditions:[ "import", "default",'require' ],
      mainFields: [ "module", "main",'browser' ],
      modulesOnly: true,
      preferBuiltins: false
    }),
    babel({ babelHelpers: 'bundled', include: ['src/**/*.ts'], extensions, exclude: './node_modules/**'})
  ]
}