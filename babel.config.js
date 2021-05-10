/* eslint-disable no-undef, @typescript-eslint/no-unused-vars */
module.exports = function (api) {
    api.cache(false);

    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                    node: true,
                },
            },
        ],
        'power-assert',
        '@babel/preset-flow',
    ];

    const plugins = [];

    return {
        presets,
        plugins,
    };
};
