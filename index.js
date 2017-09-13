/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(2);
const cookieParser = __webpack_require__(3);
const bodyParser = __webpack_require__(4);
const expressSession = __webpack_require__(5);
const passport = __webpack_require__(6);
const passport_local_1 = __webpack_require__(7);
const webpack = __webpack_require__(0);
const webpack_config_dev_1 = __webpack_require__(8);
const webpackDevMiddleware = __webpack_require__(9);
const webpackHotMiddleware = __webpack_require__(10);
const User_1 = __webpack_require__(11);
const users = new User_1.Users();
passport.use(new passport_local_1.Strategy(function (username, password, done) {
    const user = users.validUser(username, password);
    if (user != undefined)
        done(null, user);
    else
        done(null, false);
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    const user = users.getUserById(id);
    done(null, user);
});
// Webpack middleware
const compiler = webpack(webpack_config_dev_1.default);
const webppackDevMiddlewareOptions = {
    publicPath: webpack_config_dev_1.default.output.publicPath,
    stats: {
        colors: true
    }
};
const webpackDevMiddlewareHandler = webpackDevMiddleware(compiler, webppackDevMiddlewareOptions);
const webpackHotMiddlewareOptions = {
    log: console.log
};
const webpackHotMiddlewareHandler = webpackHotMiddleware(compiler, webpackHotMiddlewareOptions);
// Misc handlers
const cookieParserSecret = "secret";
const cookieParserOptions = {};
const bodyParserOptions = {
    extended: true
};
const sessionOptions = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
};
const app = express();
app.use(webpackDevMiddlewareHandler);
app.use(webpackHotMiddlewareHandler);
app.use(express.static(__dirname + "/../client/static"));
app.use(cookieParser(cookieParserSecret, cookieParserOptions));
app.use(bodyParser.urlencoded(bodyParserOptions));
app.use(expressSession(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
// Routing
app.post("/login", passport.authenticate("local", { failureRedirect: "/ff" }), function (req, res) {
    res.send(JSON.stringify(req.user));
});
app.listen(3000);

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_webpack__);

const path = __webpack_require__(13)
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
        new __WEBPACK_IMPORTED_MODULE_0_webpack__["HotModuleReplacementPlugin"]()
    ]
}

/* harmony default export */ __webpack_exports__["default"] = (config);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(12);
const path = __webpack_require__(13);
class Users {
    constructor() {
        this.filename = path.resolve("server/users/users.json");
        this.users = [];
        this.persist = true;
        this.loadUsersFromFile();
        console.log(this.filename);
    }
    loadUsersFromFile() {
        const users = fs.readFileSync(this.filename, "utf8");
        const parsed = JSON.parse(users);
        if (Array.isArray(parsed)) {
            parsed.forEach(item => {
                if (typeof item.id == "number" &&
                    typeof item.username == "string" &&
                    typeof item.password == "string") {
                    this.users.push(item);
                }
            });
        }
    }
    saveUsersToFile() {
        if (!this.persist)
            return;
        const strContent = JSON.stringify(this.users);
        fs.writeFileSync(this.filename, JSON.stringify(this.users));
    }
    nextId() {
        return 1 + this.users.reduce((prev, curr) => curr.id > prev.id ? curr : prev, { id: 0 }).id;
    }
    addUser(username, password) {
        const alreadyRegistered = this.users.find(user => user.username == username) != undefined;
        if (!alreadyRegistered) {
            this.users.push({
                id: this.nextId(),
                username,
                password
            });
            this.saveUsersToFile();
        }
    }
    deleteUser(username, password) {
        this.users = this.users.filter(user => !(user.username == username && user.password == password));
        this.saveUsersToFile();
    }
    validUser(username, password) {
        console.log(JSON.stringify(this.users));
        return this.users.find(user => user.username == username && user.password == password);
    }
    getUserById(id) {
        return this.users.find(user => user.id == id);
    }
}
exports.Users = Users;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);