import ApiClient from "./APIClient";
import APIURLs from "./APIUrls";

class UserContoller {
  constructor() {
    this.apiClient = new ApiClient(APIURLs.baseURL);
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  async getUserProfile() {
    return this.apiClient
      .post(APIURLs.profile, {}, { "x-access-token": this.user.token })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  applyForExpert() {
    this.apiClient
      .get(APIURLs.applyExpert, { "x-access-token": this.user.token })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async votePost(vote) {
    return this.apiClient
      .post(APIURLs.votePost, vote, { "x-access-token": this.user.token })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  commentPost(comment) {
    this.apiClient
      .post(APIURLs.commentPost, comment, { "x-access-token": "" })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  //File upload pending - not done
  async raiseQuery(query) {
    return this.apiClient
      .requestForm(APIURLs.raiseQuery, "POST", query, {
        "x-access-token": this.user.token,
      })
      .then((response) => {
        console.log(response.code);

        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  reportUser(report) {
    this.apiClient
      .post(APIURLs.reportUser, report, { "x-access-token": "" })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  reportQuery(report) {
    this.apiClient
      .post(APIURLs.reportQuery, report, { "x-access-token": "" })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  followUnfollow(friend) {
    this.apiClient
      .post(APIURLs.followUnfollow, friend, { "x-access-token": "" })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  getFriends() {
    this.apiClient
      .post(APIURLs.friends, {}, { "x-access-token": "" })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}

export default UserContoller;
