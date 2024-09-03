import React, { createContext, useEffect } from "react";
import PublicController from "../APIs/PublicController";
import UserContoller from "../APIs/UserController";

const FeedContext = createContext({
  topPosts: [],
  posts: [],
  getPosts: () => {},
  getPost: (id) => {},
  upVotePost: (id) => {},
  downVotePost: (id) => {},
  NullVote: (id, vote) => {},
  commentOnPost: (id, user_id, comment) => {},
  modifyPost: (id, content) => {},
  refresh: () => {},
});

const FeedProvider = (props) => {
  const [topPosts, setTopPosts] = React.useState(null);
  const [posts, setPosts] = React.useState(null);

  const publicController = new PublicController();
  const userController = new UserContoller();

  useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    try {
      const res = await publicController.getPosts();
      setPosts(res.posts);
      setTopPosts(res.top_posts);
    } catch (error) {
      console.log(error);
    }
  };

  const upVoteHandler = async (id) => {
    const body = {
      query_id: id,
      vote: 1,
    };

    setPosts((prev) => {
      return prev.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            vote_count: post.vote_count + 1,
          };
        }
        return post;
      });
    });

    const response = await userController.votePost(body);
    return true;
  };

  const downVoteHandler = async (id) => {
    const body = {
      query_id: id,
      vote: -1,
    };

    setPosts((prev) => {
      return prev.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            vote_count: post.vote_count - 1,
          };
        }
        return post;
      });
    });

    const response = await userController.votePost(body);
    return true;
  };

  const nullVoteHandler = async (id, vote) => {
    const body = {
      query_id: id,
      vote: vote,
    };

    setPosts((prev) => {
      return prev.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            vote_count: vote,
          };
        }
        return post;
      });
    });

    const response = await userController.votePost(body);
    return true;
  };

  const modifyHandler = async (id, content) => {
    const body = {
      query_content: content,
      id: id,
    };

    const response = await userController.modifyQuery(body);
    console.log(response);
    return true;
  };

  const initValue = {
    topPosts: topPosts,
    posts: posts,
    getPosts: getFeeds,
    getPost: (id) => {
      return posts.find((post) => post.id == id);
    },
    upVotePost: upVoteHandler,
    downVotePost: downVoteHandler,
    NullVote: nullVoteHandler,
    commentOnPost: (id, user_id, comment) => {},
    refresh: () => {
      getFeeds();
    },
    modifyPost: modifyHandler,
  };

  return (
    <FeedContext.Provider value={initValue}>
      {props.children}
    </FeedContext.Provider>
  );
};

export { FeedProvider, FeedContext };
