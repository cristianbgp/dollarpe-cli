"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const ErrorFallback = () => {
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
        react_1.default.createElement(ink_1.Text, { color: "red" }, "Something went wrong \u26A0\uFE0F"),
        react_1.default.createElement(ink_1.Text, { color: "red" }, "Try again later")));
};
// module.exports = ErrorFallback;
exports.default = ErrorFallback;
