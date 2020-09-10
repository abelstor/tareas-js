const HtmlWebPackPlugin       = require('html-webpack-plugin'),
      MiniCssExtractPlugin    = require('mini-css-extract-plugin'),
      OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyPlugin             = require('copy-webpack-plugin'),
      { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                },

            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        }
                    }
                ]
            },

        ]

    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),

        new CopyPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'}
            ]
        }),
        new CleanWebpackPlugin(),
    ]

}