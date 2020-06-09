"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var beerSchema = new mongoose_1.default.Schema({
    abv: {
        required: true,
        type: Number,
    },
    brewer: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    type: {
        required: true,
        type: String,
    },
}, { timestamps: true });
function applicationToJSON() {
    return this.toObject();
}
beerSchema.methods.toJSON = applicationToJSON;
var Beer = mongoose_1.default.model("Beer", beerSchema);
exports.default = Beer;
