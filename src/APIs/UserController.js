import ApiClient from "./APIClient";
import APIURLs from "./APIUrls";

class UserContoller {
  constructor() {
    this.apiClient = new ApiClient(APIURLs.baseURL);
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  async getUserProfile(id) {
    let body = {};
    if (id !== undefined) {
      body = { user_id: id };
    }

    let header;
    if (this.user !== null) {
      header = {
        "x-access-token": this.user.token,
      };
    }
    return this.apiClient
      .post(APIURLs.profile, body, header)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async applyForExpert() {
    return this.apiClient
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

  async commentPost(comment) {
    return this.apiClient
      .post(APIURLs.commentPost, comment, { "x-access-token": this.user.token })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
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

  async modifyQuery(query) {
    return this.apiClient
      .request(APIURLs.modifyQuery, "POST", query, {
        "x-access-token": this.user.token,
      })
      .then((response) => {
        console.log(response.code);
        return response;
      });
  }

  async deleteQuery(query) {
    return this.apiClient
      .request(APIURLs.deleteQuery, "POST", query, {
        "x-access-token": this.user.token,
      })
      .then((response) => {
        console.log(response.code);
        return response;
      });
  }

  async reportUser(report) {
    return this.apiClient
      .post(APIURLs.reportUser, report, { "x-access-token": this.user.token })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async reportQuery(report) {
    return this.apiClient
      .post(APIURLs.reportQuery, report, { "x-access-token": this.user.token })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async followUnfollow(friend) {
    return this.apiClient
      .post(APIURLs.followUnfolow, friend, {
        "x-access-token": this.user.token,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async getFriends() {
    return this.apiClient
      .post(APIURLs.friends, {}, { "x-access-token": this.user.token })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  async getMyQuery(id) {
    let body = {};
    if (id !== undefined) {
      body = { user_id: id };
    }

    let header;
    if (this.user !== null) {
      header = {
        "x-access-token": this.user.token,
      };
    }

    return this.apiClient
      .post(APIURLs.myqueries, body, header)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async postMyCases(cases) {
    return this.apiClient
      .post(APIURLs.submitCase, cases, { "x-access-token": this.user.token })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async getMyCases(id) {
    let body;
    if (id !== null) {
      body = {
        user_id: id,
      };
    }

    let header;
    if (this.user !== null) {
      header = { "x-access-token": this.user.token };
    }

    return this.apiClient
      .post(APIURLs.getMyCases, body, header)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async requestConsultation(cases) {
    return this.apiClient
      .post(APIURLs.requestConsultation, cases, {
        "x-access-token": this.user.token,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async getRequestConsultation() {
    return this.apiClient
      .get(APIURLs.getRequestConsultation, {
        "x-access-token": this.user.token,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async requestPromotions() {
    return this.apiClient
      .get(APIURLs.requestPromosion, {
        "x-access-token": this.user.token,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async updateConsultation(cases) {
    return this.apiClient
      .post(APIURLs.updateConsultation, cases, {
        "x-access-token": this.user.token,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async updateProfile(user) {
    return this.apiClient
      .requestForm(APIURLs.updateProfile, "POST", user, {
        "x-access-token": this.user.token,
      })
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
