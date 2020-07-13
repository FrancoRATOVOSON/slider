import VirtualElement from "./VirtualElement";

class VirtualChildsList {
    ////////////////////////////////////////
    #childList: (VirtualElement | string)[];

    ////////////////////////////////////////////////////////////
    constructor(
        childList: (VirtualElement | string)[],
        parent: VirtualElement
    ) {
        this.#childList = childList;
        this.#childList.forEach((child, index) => {
            if (typeof child != "string") child.Parent = parent;
            this.#childList[index] = child;
        });
    }

    //////////////////////////////////////////////////////////////
    getElementsList(): VirtualElement[] {
        let elementList: VirtualElement[] = [];
        this.#childList.forEach((child) => {
            if (typeof child != "string") elementList.push(child);
        });
        return elementList;
    }

    //////////////////////////////////////////////
    addElement(element: VirtualElement | string) {
        this.#childList.push(element);
    }

    /////////////////////////////////////////////////////////////////
    render(): string {
        var result: string = "";
        this.#childList.forEach(
            (child) =>
                (result += `${
                    typeof child == "string" ? child : child.render()
                }`)
        );
        return result;
    }
}

export default VirtualChildsList;
