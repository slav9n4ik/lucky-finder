const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "src/main/resources/static/js/"),
        filename: "main.js",
        publicPath: "/js/"
    },
    devServer: {
        index: '/static/index.html',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: '/static/index.html'}
            ]
        },

        host: 'localhost',
        port: '3000',
        contentBase: "./src/main/resources",
        proxy: [
            {
                context: ['/'],
                target: 'http://localhost:8080'
            }
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env',
                            '@babel/react',{
                                'plugins': ['@babel/plugin-proposal-class-properties']}]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader","css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|bpmn|woff(2)?|ttf|eot)$/,
                use: ["file-loader"]
            }
        ]
    }
};