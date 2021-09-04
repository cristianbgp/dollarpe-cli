#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const ui_1 = __importDefault(require("./ui"));
const fallback_1 = __importDefault(require("./components/fallback"));
const react_error_boundary_1 = require("react-error-boundary");
const error_fallback_1 = __importDefault(require("./components/error-fallback"));
(0, ink_1.render)(react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: error_fallback_1.default },
    react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(fallback_1.default, null) },
        react_1.default.createElement(ui_1.default, null))));
