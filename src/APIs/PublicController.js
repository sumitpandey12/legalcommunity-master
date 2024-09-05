import ApiClient from "./APIClient";
import APIURLs from "./APIUrls";

class PublicController {
  constructor() {
    this.apiClient = new ApiClient(APIURLs.baseURL);
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  async getPosts() {
    let header;
    if (this.user?.token) {
      header = { "x-access-token": this.user?.token };
    }
    return this.apiClient
      .post(
        APIURLs.posts,
        {
          search: "",
        },
        header
      )
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

  async getComments(post_id) {
    return this.apiClient
      .post(APIURLs.comment, {
        query_id: post_id,
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

  async getPost(post_id) {
    return this.apiClient
      .post(APIURLs.getPost, {
        query_id: post_id,
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

  async getMyLibrary(post_id) {
    return this.apiClient
      .post(APIURLs.getLibrary, {
        library_id: post_id,
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

  async getSearch(search) {
    return this.apiClient
      .post(APIURLs.search, {
        search: search,
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

  async getExperts(search) {
    let body = {
      search: "",
    };
    if (search !== undefined) {
      body.search = search;
    }
    return this.apiClient
      .post(APIURLs.getExperts, {
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
}

export default PublicController;
