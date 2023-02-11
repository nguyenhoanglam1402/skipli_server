import { Request, Response } from "express";
import {
  getGitHubLikesService,
  likeGitHubUserService,
  fetchGithubUsersService,
} from "../services/github.service";

export const likeGitHubUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, uid } = req.query;
    console.log(
      "🚀 ~ file: github.controller.ts:11 ~ likeGitHubUser ~ phoneNumber",
      req.params
    );
    if (typeof phoneNumber !== "string" || typeof uid !== "string")
      throw new Error("Query must be string");
    const result = await likeGitHubUserService(phoneNumber, uid);
    console.log(
      "🚀 ~ file: github.controller.ts:14 ~ likeGitHubUser ~ result",
      result
    );

    return res.status(200).json({
      result,
    });
  } catch (exception: any) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const fetchAllGitHubLikes = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.query;
    if (typeof phoneNumber !== "string")
      throw new Error("Query must be string");
    const result = await getGitHubLikesService(phoneNumber);
    return res.status(200).json({ result });
  } catch (exception: any) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchGithubUsers = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, q, page, per_page: perPage } = req.query;
    if (
      typeof phoneNumber !== "string" ||
      typeof q !== "string" ||
      typeof page !== "string" ||
      typeof perPage !== "string"
    )
      throw new Error("Query must be string");
    const result = await fetchGithubUsersService(
      phoneNumber,
      q,
      Number.parseInt(page),
      Number.parseInt(perPage)
    );
    return res.status(200).json({ result });
  } catch (exception: any) {
    return res.status(500);
  }
};
