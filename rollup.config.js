import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/main.ts',  // Point d'entrée de la librairie
    output: [
        {
            file: 'dist/bundle.js',   // Fichier de sortie
            format: 'esm',            // Format ES module pour navigateur moderne
            sourcemap: true           // Générer un sourcemap
        }
    ],
    plugins: [
        //terser(),
        copy({
            targets: [
                { src: 'src/static/*', dest: 'dist/static' } // Copy static files to dist/static
            ]
        }),
        resolve(),                 // Résoudre les modules dans node_modules
        commonjs(),                // Convertir les modules CommonJS en modules ES
        typescript({               // Plugin TypeScript
            tsconfig: './tsconfig.json'  // Utiliser le fichier tsconfig
        })
    ],
    watch: {
        include: 'src/**', // Watch all files in the src folder
        exclude: 'node_modules/**',
    },
    treeshake:true
};


