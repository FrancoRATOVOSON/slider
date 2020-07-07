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
var __name, __value;
Object.defineProperty(exports, "__esModule", { value: true });
class VirtualAttribute {
    constructor(name, value) {
        __name.set(this, void 0);
        __value.set(this, void 0);
        __classPrivateFieldSet(this, __name, name);
        __classPrivateFieldSet(this, __value, value);
    }
    set Name(name) {
        __classPrivateFieldSet(this, __name, name);
    }
    get Name() {
        return __classPrivateFieldGet(this, __name);
    }
    set Value(value) {
        __classPrivateFieldSet(this, __value, value);
    }
    get Value() {
        return __classPrivateFieldGet(this, __value);
    }
    render() {
        return `${this.Name}${typeof this.Value == "boolean" ? "" : `="${this.Value}"`}`;
    }
}
__name = new WeakMap(), __value = new WeakMap();
exports.default = VirtualAttribute;
