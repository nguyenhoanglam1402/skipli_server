import * as firebase from "firebase-admin";
import { fetchGitHubUsersAPI, getGitHubUser } from "../github.api";

export const likeGitHubUserService = (
  phoneNumber: string,
  userGitHubId: string
) => {
  const store = firebase.firestore();
  const res = store
    .collection("favoriteGitHubUser")
    .doc(`${phoneNumber.toString()}`)
    .set(
      { like: firebase.firestore.FieldValue.arrayUnion(userGitHubId) },
      { merge: true }
    )
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
  return res;
};

export const getGitHubLikesService = (phoneNumber: string) => {
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

export const fetchGithubUsersService = async (
  phoneNumber: string,
  q: string,
  page: number,
  perPage: number
) => {
  const data: any[] = [];

  const githubUsersData = await (
    await fetchGitHubUsersAPI(q, page, perPage)
  ).data;

  const totalCount: number = githubUsersData.total_count;
  const usersId = githubUsersData.items.map((item: any) => item.id);

  const usersDataDetail = usersId.map((id: any) => getGitHubUser(id));
  const response = await Promise.all(usersDataDetail);

  response.forEach((userData) => {
    data.push(userData.data);
  });

  const result = (await getGitHubLikesService(phoneNumber)) || { like: [] };
  result.like.map((item: any) => {
    const index = data.findIndex((user) => user.id === Number.parseInt(item));

    if (index === -1) return;
    data[index].like = true;
  });

  return { totalRow: totalCount, data };
};
