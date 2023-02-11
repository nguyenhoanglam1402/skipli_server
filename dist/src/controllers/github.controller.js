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
exports.fetchGithubUsers = exports.fetchAllGitHubLikes = exports.likeGitHubUser = void 0;
const github_service_1 = require("../services/github.service");
const likeGitHubUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, uid } = req.query;
        console.log("🚀 ~ file: github.controller.ts:11 ~ likeGitHubUser ~ phoneNumber", req.params);
        if (typeof phoneNumber !== "string" || typeof uid !== "string")
            throw new Error("Query must be string");
        const result = yield (0, github_service_1.likeGitHubUserService)(phoneNumber, uid);
        console.log("🚀 ~ file: github.controller.ts:14 ~ likeGitHubUser ~ result", result);
        return res.status(200).json({
            result,
        });
    }
    catch (exception) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.likeGitHubUser = likeGitHubUser;
const fetchAllGitHubLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber } = req.query;
        if (typeof phoneNumber !== "string")
            throw new Error("Query must be string");
        const result = yield (0, github_service_1.getGitHubLikesService)(phoneNumber);
        return res.status(200).json({ result });
    }
    catch (exception) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.fetchAllGitHubLikes = fetchAllGitHubLikes;
const fetchGithubUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, q, page, per_page: perPage } = req.query;
        console.log("🚀 ~ file: github.controller.ts:48 ~ fetchGithubUsers ~ phoneNumber", phoneNumber);
        if (typeof phoneNumber !== "string" ||
            typeof q !== "string" ||
            typeof page !== "string" ||
            typeof perPage !== "string")
            throw new Error("Query must be string");
        const result = yield (0, github_service_1.fetchGithubUsersService)(phoneNumber, q, Number.parseInt(page), Number.parseInt(perPage));
        console.log("🚀 ~ file: github.controller.ts:65 ~ fetchGithubUsers ~ result", result);
        return res.status(200).json({ result });
    }
    catch (exception) {
        return res.status(500);
    }
});
exports.fetchGithubUsers = fetchGithubUsers;
