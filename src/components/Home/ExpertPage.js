import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import PublicController from "../../APIs/PublicController";
import { Link } from "react-router-dom";

const ExpertPage = () => {
  const [expert, setExpert] = React.useState(null);

  const publicController = new PublicController();

  useEffect(() => {
    getExpert();
  }, []);

  const getExpert = async () => {
    const res = await publicController.getExperts();
    setExpert(res);
    console.log(res);
  };

  if (expert === null) {
    return null;
  }

  if (!expert || expert === null || expert.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <p>No experts found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <div className="text-lg font-bold mb-2">Featured Experts</div>
      {expert.map((item) => (
        <FeaturedExpertItem key={item.id} {...item} />
      ))}
    </div>
  );
};

const FeaturedExpertItem = (props) => {
  return (
    <Link to={`/account/${props.id}`}>
      <div className="w-full flex justify-between items-center gap-2 border p-2 my-1 rounded-lg">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">{props.name[0].toUpperCase()}</Avatar>
          <div className="flex flex-col items-start">
            <p className="text-md font-semibold">{props.name}</p>
            <p className="w-24 truncate text-sm text-gray-500">{props.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm bg-orange-900 text-white font-bold rounded-lg px-2">
            Expert
          </div>
          {props.is_promoted == 1 ? (
            <FaArrowTrendUp color="red" size={22} />
          ) : (
            <div className="w-4"></div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ExpertPage;
