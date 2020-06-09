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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var DeleteBeerForm_1 = __importDefault(require("./forms/DeleteBeerForm"));
var EditBeerForm_1 = __importDefault(require("./forms/EditBeerForm"));
var NewBeerForm_1 = __importDefault(require("./forms/NewBeerForm"));
var Modal = function (_a) {
    var currentBeer = _a.currentBeer, isModalOpen = _a.isModalOpen, modalContent = _a.modalContent, refreshBeers = _a.refreshBeers, setCurrentBeer = _a.setCurrentBeer, setIsLoading = _a.setIsLoading, setIsModalOpen = _a.setIsModalOpen, setModalContent = _a.setModalContent;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: !isModalOpen ? "hidden" : "shade", onClick: function () {
                if (isModalOpen)
                    setIsModalOpen(false);
            } }),
        React.createElement("div", { className: !isModalOpen ? "hidden" : undefined, id: "modal" },
            React.createElement("div", { id: "modal-close-container" },
                React.createElement("button", { id: "modal-close", onClick: function () {
                        setIsModalOpen(false);
                        setModalContent(null);
                    } }, "x")),
            modalContent === "newBeerForm" && (React.createElement(NewBeerForm_1.default, { refreshBeers: refreshBeers, setIsLoading: setIsLoading, setIsModalOpen: setIsModalOpen, setModalContent: setModalContent })),
            modalContent === "deleteBeerForm" && currentBeer && (React.createElement(DeleteBeerForm_1.default, { currentBeer: currentBeer, refreshBeers: refreshBeers, setCurrentBeer: setCurrentBeer, setIsLoading: setIsLoading, setIsModalOpen: setIsModalOpen, setModalContent: setModalContent })),
            modalContent === "editBeerForm" && currentBeer && (React.createElement(EditBeerForm_1.default, { currentBeer: currentBeer, refreshBeers: refreshBeers, setCurrentBeer: setCurrentBeer, setIsLoading: setIsLoading, setIsModalOpen: setIsModalOpen, setModalContent: setModalContent })))));
};
exports.default = Modal;
