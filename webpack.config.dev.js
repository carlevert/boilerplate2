import * as webpack from "webpack";
const path = require("path")
const config = {
    entry: [
        "webpack/hot/dev-server",
        "webpack-hot-middleware/client",
        path.join(__dirname, "../client/index.tsx")
    ],
    target: "web",
    output: {
        path: "/",
        filename: "bundle.js",
        publicPath: "http://localhost:3000/scripts/",
    },
    resolve: {
        extensions: [
            ".js", ".jsx", ".ts", ".tsx"
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: "ts-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

export default config;