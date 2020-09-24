module.exports = [
    {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
        },
    },
];
