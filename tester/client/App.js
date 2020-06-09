"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var logo_svg_1 = __importDefault(require("./logo.svg"));
var beer_1 = require("./api/beer");
var BeerDisplayer_1 = __importDefault(require("./components/BeerDisplayer"));
var LoadingIndicator_1 = __importDefault(require("./components/LoadingIndicator"));
var Modal_1 = __importDefault(require("./components/Modal"));
var App = function () {
    var _a = React.useState([]), beers = _a[0], setBeers = _a[1];
    var _b = React.useState(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = React.useState(null), modalContent = _c[0], setModalContent = _c[1];
    var _d = React.useState(undefined), currentBeer = _d[0], setCurrentBeer = _d[1];
    var _e = React.useState(true), isLoading = _e[0], setIsLoading = _e[1];
    var refreshBeers = function () { return __awaiter(void 0, void 0, void 0, function () {
        var beers_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, beer_1.getBeers()];
                case 1:
                    beers_1 = _a.sent();
                    setBeers(beers_1);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        var initializeData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentBeers, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, beer_1.getBeers()];
                    case 1:
                        currentBeers = _a.sent();
                        if (!(currentBeers.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, beer_1.initializeStarterBeers()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, beer_1.getBeers()];
                    case 3:
                        currentBeers = _a.sent();
                        _a.label = 4;
                    case 4:
                        setBeers(currentBeers);
                        setIsLoading(false);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        initializeData();
    }, []);
    return (React.createElement("div", { id: "app" },
        React.createElement("img", { alt: "Logo", id: "logo", src: logo_svg_1.default }),
        React.createElement("h1", null, "___APP NAME___"),
        React.createElement("a", { href: "https://github.com/alexlee-dev/create-mern-application/", rel: "noopener noreferrer", target: "_blank" }, "View Documentation"),
        React.createElement(BeerDisplayer_1.default, { beers: beers, setCurrentBeer: setCurrentBeer, setIsModalOpen: setIsModalOpen, setModalContent: setModalContent }),
        React.createElement(Modal_1.default, { currentBeer: currentBeer, isModalOpen: isModalOpen, modalContent: modalContent, refreshBeers: refreshBeers, setCurrentBeer: setCurrentBeer, setIsLoading: setIsLoading, setIsModalOpen: setIsModalOpen, setModalContent: setModalContent }),
        React.createElement(LoadingIndicator_1.default, { isLoading: isLoading })));
};
exports.default = App;
