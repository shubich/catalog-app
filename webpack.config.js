module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname + '/app/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.(ttf|eot|jpg|svg|png|woff(2)?)(\?[a-z0-9=&.-]+)?$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },

        ],

    },

    watch: true

};