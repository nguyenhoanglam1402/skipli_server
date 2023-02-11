"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const admin = __importStar(require("firebase-admin"));
const firebase_admin_1 = require("firebase-admin");
const accessCode_routes_1 = require("./src/routers/accessCode.routes");
const service_config_json_1 = __importDefault(require("./src/config/service.config.json"));
const github_routes_1 = require("./src/routers/github.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || "3000";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/hi", (req, res) => res.send("Welcome to Server!"));
app.use(accessCode_routes_1.accessRouters);
app.use(github_routes_1.gitHubRoutes);
admin.initializeApp({
    credential: firebase_admin_1.credential.cert(service_config_json_1.default),
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
