import VirtualElement from "./VirtualElement";

class Slider {
    ///////////////////////////////////////////////////////
    static createElement(parameter: {
        name: string;
        attributes: Array<{ name: string; value: string }>;
        childs: (VirtualElement | string)[] | undefined;
    }): VirtualElement {
        return new VirtualElement(
            parameter.name,
            parameter.attributes,
            parameter.childs
        );
    }

    //////////////////////////////////////////////
    static createRootElement() {
        return new VirtualElement("html", [], []);
    }
}

export default Slider;
