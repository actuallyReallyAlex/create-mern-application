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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var BeerDisplayer = function (_a) {
    var beers = _a.beers, setCurrentBeer = _a.setCurrentBeer, setIsModalOpen = _a.setIsModalOpen, setModalContent = _a.setModalContent;
    return (React.createElement("div", null,
        React.createElement("div", { id: "beer-table-heading" },
            React.createElement("h2", null, "Beer List"),
            React.createElement("button", { onClick: function () {
                    setModalContent("newBeerForm");
                    setIsModalOpen(true);
                } }, "Add")),
        React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "column1" }, "ABV"),
                    React.createElement("th", null, "Brewer"),
                    React.createElement("th", null, "Description"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Type"),
                    React.createElement("th", { className: "column6" }, "Actions"))),
            React.createElement("tbody", null, beers.map(function (beer) { return (React.createElement("tr", { key: beer._id },
                React.createElement("td", { className: "column1" }, beer.abv),
                React.createElement("td", null, beer.brewer),
                React.createElement("td", null, beer.description),
                React.createElement("td", null, beer.name),
                React.createElement("td", null, beer.type),
                React.createElement("td", { className: "column6 action-column" },
                    React.createElement("button", { onClick: function () {
                            setModalContent("editBeerForm");
                            setCurrentBeer(beer);
                            setIsModalOpen(true);
                        } }, "Edit"),
                    React.createElement("button", { onClick: function () {
                            setModalContent("deleteBeerForm");
                            setCurrentBeer(beer);
                            setIsModalOpen(true);
                        } }, "Delete")))); })))));
};
exports.default = BeerDisplayer;
