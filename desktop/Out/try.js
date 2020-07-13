"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Slider_1 = __importDefault(require("./VirtualDom/Slider"));
let head = Slider_1.default.createElement({
    name: "head",
    attributes: [],
    childs: [
        Slider_1.default.createElement({
            name: "link",
            attributes: [
                { name: "rel", value: "stylesheet" },
                { name: "href", value: "dist/reveal.css" },
            ],
            childs: undefined,
        }),
        Slider_1.default.createElement({
            name: "link",
            attributes: [
                { name: "rel", value: "stylesheet" },
                { name: "href", value: "dist/theme/white.css" },
            ],
            childs: undefined,
        }),
    ],
});
let reveal = Slider_1.default.createElement({
    name: "div",
    attributes: [{ name: "class", value: "reveal" }],
    childs: [
        Slider_1.default.createElement({
            name: "div",
            attributes: [{ name: "class", value: "slides" }],
            childs: [
                Slider_1.default.createElement({
                    name: "section",
                    attributes: [],
                    childs: ["Slide 1"],
                }),
                Slider_1.default.createElement({
                    name: "section",
                    attributes: [],
                    childs: ["Slide 2"],
                }),
            ],
        }),
    ],
});
let body = Slider_1.default.createElement({
    name: "body",
    attributes: [],
    childs: [
        reveal,
        Slider_1.default.createElement({
            name: "script",
            attributes: [{ name: "src", value: "dist/reveal.js" }],
            childs: [],
        }),
        Slider_1.default.createElement({
            name: "script",
            attributes: [],
            childs: ["Reveal.initialize();"],
        }),
    ],
});
let html = Slider_1.default.createRootElement();
html.addChildElement(head);
html.addChildElement(body);
console.log(html.render());
