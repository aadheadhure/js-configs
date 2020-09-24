const path = require("path");
const glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");
var nodeExternals = require("webpack-node-externals");

const { NODE_ENV = "production" } = process.env;

function getEntries(pattern) {
    const entries = {};
    pattern.forEach((pattern) => {
        glob.sync(pattern).forEach((file) => {
            entries[
                file.replace("src/", "").replace(path.extname(file), "")
            ] = path.join(__dirname, "..", file);
        });
    });
    return entries;
}

module.exports = {
    entry: getEntries(["src/**/*.js"]),
    mode: NODE_ENV,
    target: "node",
    output: {
        path: path.join(process.cwd(), "build"),
        filename: "[name].js",
        libraryTarget: "commonjs",
    },
    resolve: {
        extensions: [".js"],
    },
    module: {
        rules: require("./rules.config"),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "src/data/dmrcSqlite.sqlite",
                    to: "data/dmrcSqlite.sqlite",
                },
            ],
        }),
    ],
    externals: [nodeExternals()],
};
