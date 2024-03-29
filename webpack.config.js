const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        bundle: './frontend/src/smart_contracts.js',
        // auth: './frontend/src/auth.js',
        // encrypt: './frontend/src/encrypt.js',
    },

    output: {
        path: path.resolve(__dirname, './frontend/dist'),
        filename: '[name].js'
    },

    // resolve: {
    //     fallback: {
    //         crypto: require.resolve('crypto-browserify'),
    //         vm: require.resolve('vm-browserify'),
    //         stream: require.resolve('stream-browserify')
    //     },
    // },

    watch: true
};