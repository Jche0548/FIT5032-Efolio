/* eslint-env node */
const eslintJs = require('@eslint/js');

module.exports = [
  eslintJs.configs.recommended,

  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 2021, 
      sourceType: 'script', 

      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __filename: 'readonly',
        __dirname: 'readonly',
      }
    },
    
    ignores: ['node_modules/**', 'lib/**'],

    rules: {}
  }
];