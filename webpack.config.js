const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); // добавили плагин
const ImageWebpackLoader = require('image-webpack-loader');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки


module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
// указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
  {
        test: /\.css$/,
        use:  [MiniCssExtractPlugin.loader, 'css-loader']
       }
    ]
  },
  module: {
      rules: [
        {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                    'file-loader?name=../images/[name].[ext]', // указали папку, куда складывать изображения
                    {
                            loader: 'image-webpack-loader',
                            options: {}
                    },
            ]
     }
      ]
  },
module: {
    rules: [{
                    test: /\.css$/i,
                    use: [
                                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                                    'css-loader', 
                                    'postcss-loader'
                            ]
            },
     ]
},// в правилах укажите, что если вы собираете в режиме dev, то плагин MiniCssExtractPlugin загружать не нужно.  
  plugins: [ 
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
}),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
}),
    new WebpackMd5Hash()
  ]
};