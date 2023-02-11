import axios from "axios";

const headers = {
  Authorization:
    "token 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",
};

export const fetchGitHubUsersAPI = (
  q: string,
  page: number,
  perPage: number
) => {
  return axios.get("https://api.github.com/search/users", {
    params: {
      q,
      page,
      per_page: perPage,
    },
    headers,
  });
};

export const getGitHubUser = (id: number) => {
  return axios.get(`https://api.github.com/user/${id}`, { headers });
};
