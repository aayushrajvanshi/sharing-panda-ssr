const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

const browserConfig = {
    entry: [
        'script-loader!jquery/dist/jquery.min.js',
        'script-loader!uikit/dist/js/uikit.min.js',
        'script-loader!uikit/dist/js/uikit-icons.js',
        './src/browser/index.js'
    ],

    externals: {
        jquery: 'jQuery',
        $: 'jQuery'
    },

    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.html']
    },

    devtool: "cheap-module-source-map",

    module: {
        rules: [
            {
                test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: "file-loader",
                options: {
                    name: "public/media/[name].[ext]",
                    publicPath: url => url.replace(/public/, "")
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: { importLoaders: 1 }
                        },
                        {
                            loader: "postcss-loader",
                            options: { plugins: [autoprefixer()] }
                        },
                        {
                            loader: "sass-loader",
                        }
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: { presets: ["react-app"] }
            }, {
                test: /\.(woff|ttf|eot|woff2|svg)$/i,
                use: [{
                    loader: 'file-loader?hash=sha512&digest=hex&name=./fonts/[name].[ext]'
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),

        // new HtmlWebpackPlugin({
        //     title: "Sharing Panda | India's Crowd Funding Website",
        //     favicon: helpers.root('client/public/favicon.png'),
        //     template: helpers.root('client/public/index.html'),
        //     inject: 'body'
        // }),

        new ExtractTextPlugin({
            filename: "public/css/[name].css",
            disable: !isProd
        })
    ]
};

const serverConfig = {
    entry: {
        'app': [
            'script-loader!jquery/dist/jquery.min.js',
            'script-loader!uikit/dist/js/uikit.min.js',
            'script-loader!uikit/dist/js/uikit-icons.js',
            helpers.root('./src/server/index.js')
        ]
    },
    target: "node",
    output: {
        path: __dirname,
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: "file-loader",
                options: {
                    name: "public/media/[name].[ext]",
                    publicPath: url => url.replace(/public/, ""),
                    emit: false
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "css-loader/locals",
                    },
                    {
                        loader: "sass-loader",
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: { presets: ["react-app"] }
            }, {
                test: /\.(woff|ttf|eot|woff2|svg)$/i,
                use: [{
                    loader: 'file-loader?hash=sha512&digest=hex&name=./fonts/[name].[ext]'
                }]
            }
        ]
    }
};

module.exports = [browserConfig, serverConfig];