module.exports = {
    root: true, // Make sure eslint picks up the config at the root of the directory
    settings: {
        react: {
            version: 'detect' // Automatically detect the react version
        }
    },
    env: {
        browser: true, // Enables browser globals like window and document
        amd: true, // Enables require() and define() as global variables as per the amd spec.
        node: true // Enables Node.js global variables and Node.js scoping.
    },
    extends: [
        'plugin:jest/recommended',
        'plugin:react/recommended',
        'airbnb-typescript',
        'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // ecmaVersion: 2020, // Use the latest ecmascript standard
        // sourceType: 'module', // Allows using import/export statements
        project: ['./tsconfig.json']
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
        'react/jsx-no-bind': [
            'error',
            {
                allowArrowFunctions: true,
                allowBind: false
            }
        ]
    }
};
