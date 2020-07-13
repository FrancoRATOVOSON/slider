import VirtualAttributesList from "./VirtualAttributesList";
import VirtualChildsList from "./VirtualChildsList";

class VirtualElement {
    ////////////////////////////////////////////////////////////
    #_attributes: VirtualAttributesList;
    get Attributes(): VirtualAttributesList {
        return this.#_attributes;
    }
    addAtribute(parameter: { name: string; value: string | boolean }) {
        this.Attributes.addAtribute(parameter);
    }

    ///////////////////////
    #_name: string;
    get Name(): string {
        return this.#_name;
    }

    ////////////////////////////////////////////////////////////////
    #_parent: VirtualElement | null;
    set Parent(parent: VirtualElement | null) {
        this.#_parent = parent;
    }
    getParentName(): string {
        return this.#_parent == null ? "null" : this.#_parent.Name;
    }

    //////////////////////////////////////////////////////////////////////////
    #_childs: VirtualChildsList | undefined;
    set Childs(childs: VirtualChildsList | undefined) {
        this.#_childs = childs;
    }
    get Childs(): VirtualChildsList | undefined {
        return this.#_childs;
    }
    getChildsElements(): VirtualElement[] {
        return this.Childs == undefined ? [] : this.Childs.getElementsList();
    }
    addChildElement(child: VirtualElement) {
        this.Childs == undefined
            ? (this.Childs = new VirtualChildsList([child], this))
            : this.Childs.addElement(child);
    }
    addTextToElement(text: string) {
        this.Childs != undefined && this.Childs.addElement(text);
    }

    ////////////////////////////////////////////////////////////////
    constructor(
        name: string,
        attributes: Array<{ name: string; value: string }>,
        childs: (VirtualElement | string)[] | undefined = undefined
    ) {
        this.#_name = name;
        this.#_childs =
            typeof childs == "undefined"
                ? childs
                : new VirtualChildsList(childs, this);
        this.#_attributes = new VirtualAttributesList(attributes);
        this.#_parent = null;
    }

    ///////////////////////////////////////////////////////////////////
    render(): string {
        return `${this.Name == "html" ? "<!DOCTYPE html>\n" : ""}<${this.Name}${
            this.Attributes.Length < 1 ? "" : this.Attributes.render()
        }${
            this.Childs == undefined
                ? "/>"
                : `>${this.Childs.render()}</${this.Name}>`
        }`;
    }
}

export default VirtualElement;
