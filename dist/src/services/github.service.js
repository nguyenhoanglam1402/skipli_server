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
exports.fetchGithubUsersService = exports.getGitHubLikesService = exports.likeGitHubUserService = void 0;
const firebase = __importStar(require("firebase-admin"));
const github_api_1 = require("../github.api");
const likeGitHubUserService = (phoneNumber, userGitHubId) => {
    const store = firebase.firestore();
    const res = store
        .collection("favoriteGitHubUser")
        .doc(`${phoneNumber.toString()}`)
        .set({ like: firebase.firestore.FieldValue.arrayUnion(userGitHubId) }, { merge: true })
        .then((data) => data)
        .catch((error) => {
        throw new Error(error);
    });
    return res;
};
exports.likeGitHubUserService = likeGitHubUserService;
const getGitHubLikesService = (phoneNumber) => {
    const store = firebase.firestore();
    const res = store
        .collection("favoriteGitHubUser")
        .doc(phoneNumber)
        .get()
        .then((data) => data.data())
        .catch((error) => {
        throw new Error(error);
    });
    return res;
};
exports.getGitHubLikesService = getGitHubLikesService;
const fetchGithubUsersService = (phoneNumber, q, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    const data = [];
    const githubUsersData = yield (yield (0, github_api_1.fetchGitHubUsersAPI)(q, page, perPage)).data;
    const totalCount = githubUsersData.total_count;
    const usersId = githubUsersData.items.map((item) => item.id);
    const usersDataDetail = usersId.map((id) => (0, github_api_1.getGitHubUser)(id));
    const response = yield Promise.all(usersDataDetail);
    response.forEach((userData) => {
        data.push(userData.data);
    });
    const result = (yield (0, exports.getGitHubLikesService)(phoneNumber)) || { like: [] };
    console.log("🚀 ~ file: github.service.ts:59 ~ result", result);
    if (result.like.length !== 0)
        result.like.map((item) => {
            const index = data.findIndex((user) => user.id === Number.parseInt(item));
            if (index === -1)
                return;
            data[index].like = true;
        });
    return { totalRow: totalCount, data };
});
exports.fetchGithubUsersService = fetchGithubUsersService;
