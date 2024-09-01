import React, { useEffect, useState } from "react";
import FeedItem from "./FeedItem";
import PublicController from "../../../APIs/PublicController";

const Feed = ({ feeds }) => {
  return (
    <div className="">
      {feeds &&
        feeds.map((feed, index) => (
          <FeedItem
            key={index}
            full_name={feed.name}
            comment_count={feed.comment_count}
            date={feed.created_at}
            description={feed.query_content}
            image_url={feed.file}
            id={feed.id}
            user_profile={feed.profile}
            like_count={feed.vote_count}
          />
        ))}
    </div>
  );
};

export default Feed;
