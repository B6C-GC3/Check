const { when, whenDev, whenProd, whenCI, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
    plugins: [{
        plugin: CracoAntDesignPlugin,
        options: {
            // customizeTheme: {
            //     '@primary-color': '#1DA57A',
            //     '@link-color': '#1DA57A',
            // },
            customizeTheme: {
                '@primary-color': '#1890ff',
                '@link-color': '#1890ff',
            },
        },
    },],
    webpack: {
        alias: {},
        plugins: [],
        configure: (webpackConfig, { env, paths }) => {
            if (!webpackConfig.plugins) {
                config.plugins = [];
            }

            webpackConfig.plugins.push(
                process.env.NODE_ENV === 'production' ?
                    new CopyWebpackPlugin([{
                        from: 'src/lib/abp.js'
                    }]) :
                    new CopyWebpackPlugin([{
                        from: 'src/lib/abp.js'
                    }])
            );

            webpackConfig.plugins.push(
                process.env.NODE_ENV === 'production' ?
                    new CopyWebpackPlugin([{
                        from: 'src/utils/utils.ts'
                    }]) :
                    new CopyWebpackPlugin([{
                        from: 'src/utils/utils.ts'
                    }])
            );
            return webpackConfig;
        },
    },
};