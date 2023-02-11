import axios from "axios";

const headers = {
  Authorization: "token <Github Authentication>",
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
