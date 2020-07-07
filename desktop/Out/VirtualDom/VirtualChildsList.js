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
var _childList;
Object.defineProperty(exports, "__esModule", { value: true });
class VirtualChildsList {
    constructor(childList, parent) {
        _childList.set(this, void 0);
        __classPrivateFieldSet(this, _childList, childList);
        __classPrivateFieldGet(this, _childList).forEach((child, index) => {
            if (typeof child != "string")
                child.Parent = parent;
            __classPrivateFieldGet(this, _childList)[index] = child;
        });
    }
    getElementsList() {
        let elementList = [];
        __classPrivateFieldGet(this, _childList).forEach((child) => {
            if (typeof child != "string")
                elementList.push(child);
        });
        return elementList;
    }
    addElement(element) {
        __classPrivateFieldGet(this, _childList).push(element);
    }
    render() {
        var result = "";
        __classPrivateFieldGet(this, _childList).forEach((child) => (result += `\n\t${typeof child == "string" ? child : child.render()}\n`));
        return result;
    }
}
_childList = new WeakMap();
exports.default = VirtualChildsList;
