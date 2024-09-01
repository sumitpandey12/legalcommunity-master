import React, { useContext, useEffect, useState } from "react";
import TopFeed from "./TopFeed/TopFeed";
import Feed from "./Feed/Feed";
import PublicController from "../../APIs/PublicController";
import { FeedContext, FeedProvider } from "../../Context/FeedContext";

const Home = (props) => {
  const [feeds, setFeeds] = useState([]);
  const publicController = new PublicController();

  const feedContext = useContext(FeedContext);

  useEffect(() => {
    getFeeds();
    feedContext.getPosts();
  }, []);

  const getFeeds = async () => {
    try {
      const res = await publicController.getPosts();
      setFeeds(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FeedProvider>
      <div className={`p-4 bg-white ${props.className}`}>
        <TopFeed feeds={feeds.top_posts} />
        <Feed feeds={feeds.posts} />
      </div>
    </FeedProvider>
  );
};

export default Home;
