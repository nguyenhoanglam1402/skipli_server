"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const github_service_1 = require("../services/github.service");
const getGitHubUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, page, per_page: perPage } = req.params;
    const data = yield (0, github_service_1.fetchGitHubUser)(q, Number.parseInt(page), Number.parseInt(perPage));
    console.log("🚀 ~ file: github.conteoller.ts:11 ~ getGitHubUsers ~ data", data);
});
