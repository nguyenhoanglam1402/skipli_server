"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessCode = void 0;
const generateAccessCode = () => Math.floor(Math.random() * (999999 - 100000)) + 100000;
exports.generateAccessCode = generateAccessCode;
