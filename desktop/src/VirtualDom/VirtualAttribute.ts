class VirtualAttribute {
    /////////////////////////
    #_name: string;
    set Name(name: string) {
        this.#_name = name;
    }
    get Name(): string {
        return this.#_name;
    }

    /////////////////////////////////////
    #_value: string | boolean;
    set Value(value: string | boolean) {
        this.#_value = value;
    }
    get Value(): string | boolean {
        return this.#_value;
    }

    ////////////////////////////////////////////////////
    constructor(name: string, value: string | boolean) {
        this.#_name = name;
        this.#_value = value;
    }

    ////////////////////////////////////////////////////////////////
    render(): string {
        return `${this.Name}${
            typeof this.Value == "boolean" ? "" : `="${this.Value}"`
        }`;
    }
}

export default VirtualAttribute;
