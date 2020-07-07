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
var __attributeList;
Object.defineProperty(exports, "__esModule", { value: true });
const VirtualAttribute_1 = __importDefault(require("./VirtualAttribute"));
class VirtualAttributesList {
    constructor(attributeList) {
        __attributeList.set(this, void 0);
        __classPrivateFieldSet(this, __attributeList, attributeList.map((attribute) => new VirtualAttribute_1.default(attribute.name, attribute.value)));
    }
    get AttributeList() {
        return __classPrivateFieldGet(this, __attributeList);
    }
    addAtribute(parameter) {
        this.AttributeList.push(new VirtualAttribute_1.default(parameter.name, parameter.value));
    }
    removeAttribute(name) {
        let index = this.indexOfAttribute(name);
        this.AttributeList.splice(index, 1);
    }
    removeAttributeValue(name, value) {
        let index = this.indexOfAttribute(name);
        if (typeof this.AttributeList[index].Value != "boolean")
            this.AttributeList[index].Value = this.AttributeList[index].Value.toString().replace(value, "");
    }
    getAttributeValue(name) {
        let index = this.indexOfAttribute(name);
        return this.AttributeList[index].Value;
    }
    setAttributeValue(name, value) {
        let index = this.indexOfAttribute(name);
        this.AttributeList[index].Value = value;
    }
    addAttributeValue(name, value) {
        let index = this.indexOfAttribute(name);
        if (typeof this.AttributeList[index].Value != "boolean")
            this.AttributeList[index].Value += ` ${value}`;
    }
    get Length() {
        return this.AttributeList.length;
    }
    render() {
        let result = "";
        this.AttributeList.forEach((attribute) => (result += ` ${attribute.render()}`));
        return result;
    }
    indexOfAttribute(name) {
        var result = -1;
        this.AttributeList.forEach((attribute, index) => {
            if (attribute.Name == name)
                result = index;
        });
        return result;
    }
}
__attributeList = new WeakMap();
exports.default = VirtualAttributesList;
