import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";

import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import * as webpack from "webpack";
import webpackConfig from "../webpack.config.dev"
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";

import { User, Users } from "./users/User"

const users = new Users();

passport.use(new LocalStrategy(
	function (username: string, password: string, done: (error: any, user: User | boolean) => void) {
		const user = users.validUser(username, password);
		if (user != undefined)
			done(null, user);
		else
			done(null, false);
	}
));

passport.serializeUser(function (user: User, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id: number, done: (err, user: User) => void) {
	const user = users.getUserById(id);
	done(null, user);
});

// Webpack middleware

const compiler = webpack(webpackConfig);

const webppackDevMiddlewareOptions: webpackDevMiddleware.Options = {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true
	}
}
const webpackDevMiddlewareHandler = webpackDevMiddleware(compiler, webppackDevMiddlewareOptions);

const webpackHotMiddlewareOptions: webpackHotMiddleware.Options = {
	log: console.log
}
const webpackHotMiddlewareHandler = webpackHotMiddleware(compiler, webpackHotMiddlewareOptions);


// Misc handlers

const cookieParserSecret = "secret";
const cookieParserOptions: cookieParser.CookieParseOptions = {}
const bodyParserOptions: bodyParser.OptionsUrlencoded = {
	extended: true
}
const sessionOptions: expressSession.SessionOptions = {
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

app.post("/login",
	passport.authenticate("local", { failureRedirect: "/ff"}),
	function (req, res) { 
		res.send(JSON.stringify(req.user))
	}
);

app.listen(3000);

