import ApiClient from "./APIClient";
import APIURLs from "./APIUrls";

class PublicController {
  constructor() {
    this.apiClient = new ApiClient(APIURLs.baseURL);
  }

  async getPosts() {
    console.log(APIURLs.posts);
    return this.apiClient
      .post(APIURLs.posts, {
        search: "",
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

  async getLibrary(search, type, category_id) {
    return this.apiClient
      .post(APIURLs.library, {
        search: search,
        type: type,
        category_id: category_id,
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

  async getCategories() {
    return this.apiClient
      .get(APIURLs.categories)
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

export default PublicController;
