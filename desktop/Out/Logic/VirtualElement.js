"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __attributes, __name, __parent, __childs;
Object.defineProperty(exports, "__esModule", { value: true });
const VirtualAttributesList_1 = __importDefault(require("./VirtualAttributesList"));
const VirtualChildsList_1 = __importDefault(require("./VirtualChildsList"));
class VirtualElement {
    constructor(name, attributes, childs = undefined) {
        __attributes.set(this, void 0);
        __name.set(this, void 0);
        __parent.set(this, void 0);
        __childs.set(this, void 0);
        __classPrivateFieldSet(this, __name, name);
        __classPrivateFieldSet(this, __childs, typeof childs == "undefined"
            ? childs
            : new VirtualChildsList_1.default(childs, this));
        __classPrivateFieldSet(this, __attributes, new VirtualAttributesList_1.default(attributes));
        __classPrivateFieldSet(this, __parent, null);
    }
    get Attributes() {
        return __classPrivateFieldGet(this, __attributes);
    }
    addAtribute(parameter) {
        this.Attributes.addAtribute(parameter);
    }
    get Name() {
        return __classPrivateFieldGet(this, __name);
    }
    set Parent(parent) {
        __classPrivateFieldSet(this, __parent, parent);
    }
    getParentName() {
        return __classPrivateFieldGet(this, __parent) == null ? "null" : __classPrivateFieldGet(this, __parent).Name;
    }
    set Childs(childs) {
        __classPrivateFieldSet(this, __childs, childs);
    }
    get Childs() {
        return __classPrivateFieldGet(this, __childs);
    }
    getChildsElements() {
        return this.Childs == undefined ? [] : this.Childs.getElementsList();
    }
    addChildElement(child) {
        this.Childs == undefined
            ? (this.Childs = new VirtualChildsList_1.default([child], this))
            : this.Childs.addElement(child);
    }
    addTextToElement(text) {
        this.Childs != undefined && this.Childs.addElement(text);
    }
    render() {
        return `<${this.Name}${this.Attributes.Length < 1 ? "" : this.Attributes.render()}${this.Childs == undefined
            ? "/>"
            : `>${this.Childs.render()}</${this.Name}>`}`;
    }
}
__attributes = new WeakMap(), __name = new WeakMap(), __parent = new WeakMap(), __childs = new WeakMap();
exports.default = VirtualElement;
