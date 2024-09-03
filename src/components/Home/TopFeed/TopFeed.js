import React, { useContext, useEffect } from "react";
import "./TopFeed.css";
import TopFeedItem from "./TopFeedItem";
import { FeedContext } from "../../../Context/FeedContext";

const imageURL =
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const TopFeed = ({ feeds }) => {
  const feedContext = useContext(FeedContext);

  useEffect(() => {}, [feedContext.topPosts]);

  return (
    <div className="flex hide-scrollbar overflow-x-scroll space-x-4 p-4 rounded-lg">
      {feedContext.topPosts &&
        feedContext.topPosts.map((item, index) => (
          <TopFeedItem
            key={index}
            imageURL={item.file}
            title={item.query_content}
            desc={item.name}
          />
        ))}
    </div>
  );
};

export default TopFeed;
