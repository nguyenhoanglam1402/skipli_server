import { Router } from "express";
import {
  fetchAllGitHubLikes,
  fetchGithubUsers,
  likeGitHubUser,
} from "../controllers/github.controller";

export const gitHubRoutes = Router();

gitHubRoutes.put("/github/like", likeGitHubUser);
gitHubRoutes.get("/github/get-like", fetchAllGitHubLikes);
gitHubRoutes.get("/github/users", fetchGithubUsers);
