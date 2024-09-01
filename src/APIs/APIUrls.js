export default class APIURLs {
  static baseURL = "http://127.0.0.1:4000";
  static register = "/auth/register";
  static login = "/auth/login";

  //Public routes
  static library = "/public/libraries";
  static posts = "/public/posts";
  static categories = "/public/categories";

  //User routes
  static profile = "/user/profile";
  static applyExpert = "/user/apply-expert";
  static votePost = "/user/vote-post";
  static commentPost = "/user/comment-post";
  static raiseQuery = "/user/raise-query";
  static modifyQuery = "/user/modify-query";
  static requestConsultation = "/user/request-consultation";
  static reportUser = "/user/report-user";
  static reportQuery = "/user/report-query";
  static followUnfolow = "/user/follow-unfollow";
  static friends = "/user/friends";
}
