"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessRouters = void 0;
const express_1 = require("express");
const accessCode_controllers_1 = require("../controllers/accessCode.controllers");
exports.accessRouters = (0, express_1.Router)();
exports.accessRouters.post("/access-code/new", accessCode_controllers_1.createNewAccessCode);
exports.accessRouters.post("/access-code/validate", accessCode_controllers_1.validateAccessCode);
