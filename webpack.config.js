const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugins = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const babiliPlugin = require('babili-webpack-plugin');

// start plugins 

/**
 *  Variável que define a url da api para localhost ou produção.
 * 
 *  No código JS basta utilizar a variável da seguinte forma: `${SERVICE_URL}/minha-rest-api` que o webpack substituirá o parâmetro pelo valor atribuido na variável.
 * 
 *  O parametro process.env.NODE_ENV é passado na linha de comando na execução do webpack (vide "script" no package.json)
 * 
 */
let SERVICE_URL = process.env.NODE_ENV == 'production' ? JSON.stringify('https://meu-site.com') : JSON.stringify('http://localhost:8080');
let api = new webpack.DefinePlugin({ SERVICE_URL });

/**
 *  Plugin responsável por extrair o css para um bundle separado do código JS.
 *  Sem esse plugin o "código" CSS ficará no mesmo arquivo bundle do JS ocasionando alguns problemas de renderização do html/css.
 */
let appCss = new miniCssExtractPlugin({
    filename: 'app.min.css',
});

/**
 *  Plugin responsável por disponibilizar alguns módulos globais. No exemplo abaixo a própria lib do jQuery disponibiliza seu modulo por meio
 *  das variaveis globais "$" e "jQuery", mas em função do bundle elas precisam ser "disponibilizadas" globalmente pelo webpack.
 */
let provideGlobal = new webpack.ProvidePlugin({
    $: 'jquery/dist/jquery.min.js',
    jQuery: 'jquery/dist/jquery.min.js'
});

/**
 *  Plugin responsável por gerar um index.html a partir de um modelo.
 *  Esse plugin minifica o html modelo e injeta os bundles gerados pelo webpack (automagicamente).
 */
let indexHtml = new htmlWebpackPlugins({
    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    filename: 'index.html',
    template: __dirname + '/src/index.html'
});

/**
 *  Lista dos plugins anteiores que será passado no objeto de configuração do webpack no final do arquivo.
 */
let plugins = [api, appCss, provideGlobal, indexHtml];

if (process.env.NODE_ENV == 'production') {
    let optimizePluginsPerformance = new webpack.optimize.ModuleConcatenationPlugin();
    let jsMinify = new babiliPlugin();
    let cssProcessorAndMinify = new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    });

    plugins.push(optimizePluginsPerformance, jsMinify, cssProcessorAndMinify);
}

// end plugins
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
// start rules

/**
 *  Configuração de regra para filtrar os arquivos do tipo woff e woff2 utilizando o loader para interpretar o arquivo e gerar um novo bundle.
 */
let fontWoff =  {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
};

/**
 *  Configuração de regra para filtrar os arquivos do tipo ttf utilizando o loader para interpretar o arquivo e gerar um novo bundle.
 */
let fontTtf =  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
};

/**
 *  Configuração de regra para filtrar os arquivos do tipo eot utilizando o loader para interpretar o arquivo e gerar um novo bundle.
 */
let fontEot = {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader'
};

/**
 *  Configuração de regra para filtrar os arquivos do tipo svg utilizando o loader para interpretar o arquivo e gerar um novo bundle.
 */
let svg = {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
};

/**
 *  Configuração de regra para filtrar os arquivos do tipo css utilizando o loader do plugin e um loader adicional em caso de falha para interpretar o arquivo e gerar um novo bundle.
 */
let css = {
    test: /\.css$/,
    loader: [miniCssExtractPlugin.loader, 'css-loader']
};

/**
 *  Configuração de regra para filtrar os arquivos do tipo js do projeto que não são de bibliotecas utilizando o loader para interpretar o arquivo e gerar um novo bundle.
 */
let js = {
    test: /\.js$/, 
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    }
};

/**
 *  Lista de regras que será passado no objeto de configuração do webpack no final do arquivo.
 */
let rules = [ js, css, fontWoff, fontTtf, fontEot, svg ];

// end rules
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'app.min.js',
        path: path.resolve(__dirname + '/dist'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](jquery|bootstrap)[\\/]/,
                    chunks: 'all'
                }
            }
        }
    },
    module: { rules },
    plugins
}