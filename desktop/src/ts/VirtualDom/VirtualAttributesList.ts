import VirtualAttribute from "./VirtualAttribute";

class VirtualAttributesList {
    ////////////////////////////////////////////////////////////////////
    #_attributeList: VirtualAttribute[];
    get AttributeList(): VirtualAttribute[] {
        return this.#_attributeList;
    }
    addAtribute(parameter: { name: string; value: string | boolean }) {
        this.AttributeList.push(
            new VirtualAttribute(parameter.name, parameter.value)
        );
    }
    removeAttribute(name: string) {
        let index = this.indexOfAttribute(name);
        this.AttributeList.splice(index, 1);
    }
    removeAttributeValue(name: string, value: string) {
        let index = this.indexOfAttribute(name);
        if (typeof this.AttributeList[index].Value != "boolean")
            this.AttributeList[index].Value = this.AttributeList[
                index
            ].Value.toString().replace(value, "");
    }
    getAttributeValue(name: string): string | boolean {
        let index = this.indexOfAttribute(name);
        return this.AttributeList[index].Value;
    }
    setAttributeValue(name: string, value: string | boolean) {
        let index = this.indexOfAttribute(name);
        this.AttributeList[index].Value = value;
    }
    addAttributeValue(name: string, value: string) {
        let index = this.indexOfAttribute(name);
        if (typeof this.AttributeList[index].Value != "boolean")
            this.AttributeList[index].Value += ` ${value}`;
    }

    ////////////////////////////////////////////////////////////////////////////
    constructor(attributeList: Array<{ name: string; value: string }>) {
        this.#_attributeList = attributeList.map(
            (attribute) => new VirtualAttribute(attribute.name, attribute.value)
        );
    }

    //////////////////////////////////////
    get Length(): number {
        return this.AttributeList.length;
    }

    ////////////////////////////////////////////////////////////
    render(): string {
        let result: string = "";
        this.AttributeList.forEach(
            (attribute) => (result += ` ${attribute.render()}`)
        );
        return result;
    }

    //////////////////////////////////////////////////////
    private indexOfAttribute(name: string) {
        var result = -1;
        this.AttributeList.forEach((attribute, index) => {
            if (attribute.Name == name) result = index;
        });
        return result;
    }
}

export default VirtualAttributesList;
