import ApiClient from "./APIClient";
import APIURLs from "./APIUrls";

class ChatController {
  constructor() {
    this.apiClient = new ApiClient(APIURLs.baseURL);
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  async getChats() {
    return this.apiClient
      .get(APIURLs.getChats, {
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

  async createChat(cases) {
    return this.apiClient
      .post(APIURLs.createChat, cases, {
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
  async addMessage(cases) {
    return this.apiClient
      .post(APIURLs.addMessage, cases, {
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
  async getMessages(cases) {
    return this.apiClient
      .post(APIURLs.getMessages, cases, {
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

export default ChatController;
