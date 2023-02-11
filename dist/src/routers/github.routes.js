"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitHubRoutes = void 0;
const express_1 = require("express");
const github_controller_1 = require("../controllers/github.controller");
exports.gitHubRoutes = (0, express_1.Router)();
exports.gitHubRoutes.put("/github/like", github_controller_1.likeGitHubUser);
exports.gitHubRoutes.get("/github/get-like", github_controller_1.fetchAllGitHubLikes);
exports.gitHubRoutes.get("/github/users", github_controller_1.fetchGithubUsers);
