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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var beer_1 = require("../../api/beer");
var DeleteBeerForm = function (_a) {
    var currentBeer = _a.currentBeer, refreshBeers = _a.refreshBeers, setCurrentBeer = _a.setCurrentBeer, setIsLoading = _a.setIsLoading, setIsModalOpen = _a.setIsModalOpen, setModalContent = _a.setModalContent;
    return (React.createElement("form", { className: "form", id: "delete-beer-form", onSubmit: function (e) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        setIsLoading(true);
                        return [4 /*yield*/, beer_1.deleteBeer(currentBeer._id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, refreshBeers()];
                    case 2:
                        _a.sent();
                        setIsModalOpen(false);
                        setModalContent(null);
                        setCurrentBeer(null);
                        setIsLoading(false);
                        return [2 /*return*/];
                }
            });
        }); } },
        React.createElement("h3", null, "Delete Beer"),
        React.createElement("p", null, "Are you sure you want to delete this beer?"),
        React.createElement("label", { htmlFor: "abv" }, "ABV"),
        React.createElement("input", { disabled: true, id: "abv", value: currentBeer.abv }),
        React.createElement("label", { htmlFor: "brewer" }, "Brewer"),
        React.createElement("input", { disabled: true, id: "brewer", value: currentBeer.brewer }),
        React.createElement("label", { htmlFor: "description" }, "Description"),
        React.createElement("input", { disabled: true, id: "description", value: currentBeer.description }),
        React.createElement("label", { htmlFor: "name" }, "Name"),
        React.createElement("input", { disabled: true, id: "name", value: currentBeer.name }),
        React.createElement("label", { htmlFor: "type" }, "Type"),
        React.createElement("input", { disabled: true, id: "type", value: currentBeer.type }),
        React.createElement("button", { type: "submit" }, "Delete")));
};
exports.default = DeleteBeerForm;
