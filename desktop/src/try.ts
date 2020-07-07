//import Slider from "./VirtualDom/Slider";

/*
let section = Slider.createElement({
    name: "section",
    attributes: [],
    childs: ["Texte Sous Section"],
});
let div = Slider.createElement({
    name: "div",
    attributes: [{ name: "style", value: "none" }],
    childs: ["My div", section],
});
console.log(div.render());
*/

/*
let head = Slider.createElement({
    name: "head",
    attributes: [],
    childs: [
        Slider.createElement({
            name: "link",
            attributes: [
                { name: "rel", value: "stylesheet" },
                { name: "href", value: "dist/reveal.css" },
            ],
            childs: undefined,
        }),
        Slider.createElement({
            name: "link",
            attributes: [
                { name: "rel", value: "stylesheet" },
                { name: "href", value: "dist/theme/white.css" },
            ],
            childs: undefined,
        }),
    ],
});
let reveal = Slider.createElement({
    name: "div",
    attributes: [{ name: "class", value: "reveal" }],
    childs: [
        Slider.createElement({
            name: "div",
            attributes: [{ name: "class", value: "slides" }],
            childs: [
                Slider.createElement({
                    name: "section",
                    attributes: [],
                    childs: ["Slide 1"],
                }),
                Slider.createElement({
                    name: "section",
                    attributes: [],
                    childs: ["Slide 2"],
                }),
            ],
        }),
    ],
});
let body = Slider.createElement({
    name: "body",
    attributes: [],
    childs: [
        reveal,
        Slider.createElement({
            name: "script",
            attributes: [{ name: "src", value: "dist/reveal.js" }],
            childs: [],
        }),
        Slider.createElement({
            name: "script",
            attributes: [],
            childs: ["Reveal.initialize();"],
        }),
    ],
});
let html = Slider.createRootElement();
html.addChildElement(head);
html.addChildElement(body);
console.log(html.render());
*/
/*
import { HttpServer } from "./Server/Listener";

var server = new HttpServer();
server.listen();
server.ServerEvent.on("server:received", (data) => console.log(data));
*/
