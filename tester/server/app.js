"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    App.prototype.initializeMiddlewares = function () {
        if (!process.env.MONGODB_URL)
            throw new Error("No MOONGODB_URL");
        mongoose_1.default.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        this.app.use(express_1.default.json());
        this.app.use(morgan_1.default("dev"));
        var whitelistDomains = [
            "http://localhost:3000",
            "http://localhost:8080",
            undefined,
        ];
        var corsOptions = {
            origin: function (requestOrigin, callback) {
                if (whitelistDomains.indexOf(requestOrigin) !== -1) {
                    callback(null, true);
                }
                else {
                    // eslint-disable-next-line no-console
                    console.error("Sever refused to allow: " + requestOrigin);
                    callback(new Error("Not allowed by CORS"));
                }
            },
        };
        this.app.use(cors_1.default(corsOptions));
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use("/", controller.router);
        });
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../dist")));
        this.app.get("*", function (req, res) {
            res.sendFile(path_1.default.join(__dirname, "../dist/index.html"));
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            // eslint-disable-next-line no-console
            console.log("Mode: " + chalk_1.default.blueBright(process.env.NODE_ENV) + "\n");
            // eslint-disable-next-line no-console
            console.log("Server is listening on port: " + chalk_1.default.blueBright(_this.port) + "\n");
        });
    };
    return App;
}());
exports.default = App;
