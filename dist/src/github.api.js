"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHubUser = exports.fetchGitHubUsersAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const headers = {
    Authorization: "token <Github Authentication>",
};
const fetchGitHubUsersAPI = (q, page, perPage) => {
    return axios_1.default.get("https://api.github.com/search/users", {
        params: {
            q,
            page,
            per_page: perPage,
        },
        headers,
    });
};
exports.fetchGitHubUsersAPI = fetchGitHubUsersAPI;
const getGitHubUser = (id) => {
    return axios_1.default.get(`https://api.github.com/user/${id}`, { headers });
};
exports.getGitHubUser = getGitHubUser;
