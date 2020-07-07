"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VirtualElement_1 = __importDefault(require("./VirtualElement"));
class Slider {
    static createElement(parameter) {
        return new VirtualElement_1.default(parameter.name, parameter.attributes, parameter.childs);
    }
    static createRootElement() {
        return new VirtualElement_1.default("html", [], []);
    }
}
exports.default = Slider;
