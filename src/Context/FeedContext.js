import React, { createContext } from "react";
import PublicController from "../APIs/PublicController";

const FeedContext = createContext({
  topPosts: [],
  posts: [],
  getPosts: () => {},
  upVotePost: (id) => {},
  downVotePost: (id) => {},
  NullVote: (id) => {},
  commentOnPost: (id, user_id, comment) => {},
  refresh: () => {},
});

const FeedProvider = (props) => {
  const [topPosts, setTopPosts] = React.useState([]);
  const [posts, setPosts] = React.useState([]);

  const publicController = new PublicController();

  const getFeeds = async () => {
    console.log("getFeeds");
    try {
      const res = await publicController.getPosts();
      setPosts(res.posts);
      setTopPosts(res.feeds.top_posts);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const initValue = {
    topPosts: topPosts,
    posts: posts,
    getPosts: getFeeds,
    upVotePost: (id) => {},
    downVotePost: (id) => {},
    NullVote: (id) => {},
    commentOnPost: (id, user_id, comment) => {},
    refresh: () => {},
  };

  return (
    <FeedContext.Provider value={initValue}>
      {props.children}
    </FeedContext.Provider>
  );
};

export { FeedProvider, FeedContext };
