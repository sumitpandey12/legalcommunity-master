import React, { useEffect, useState } from "react";
import TopFeed from "./TopFeed/TopFeed";
import Feed from "./Feed/Feed";
import PublicController from "../../APIs/PublicController";

const Home = (props) => {
  const [feeds, setFeeds] = useState([]);
  const publicController = new PublicController();

  useEffect(() => {
    getFeeds();
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
    <div className={`p-4 bg-white ${props.className}`}>
      <TopFeed feeds={feeds.top_posts} />
      <Feed feeds={feeds.posts} />
    </div>
  );
};

export default Home;
