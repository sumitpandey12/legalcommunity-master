import React, { useEffect, useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LibraryItem from "../../Utils/LibraryPostCard";
import PublicController from "../../APIs/PublicController";
import UserContoller from "../../APIs/UserController";
import AddLibrary from "./AddLibrary";
import Spinner from "../../Utils/Spinner";
import Utils from "../../Utils/Utils";
import ExpertPage from "../Home/ExpertPage";

const Library = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(-1);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [libraries, setLibraries] = React.useState([]);
  const [categories, setCategories] = useState(null);

  const publicController = new PublicController();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getLibraries();
  }, [selectedTab, selectedCategory]);

  const getLibraries = async () => {
    const res = await publicController.getLibrary(
      "",
      selectedTab === 0 ? "Case" : "Law",
      selectedCategory
    );
    setLibraries(res);
  };

  const getCategories = async () => {
    const res = await publicController.getCategories();
    console.log(res);
    setCategories(res);
  };

  const handleClick = (id) => {
    setSelectedCategory(id);
  };

  if (categories === null || libraries === null) return <Spinner />;

  return (
    <div className="flex">
      <div className="px-4 pt-4 relative w-3/4 h-full">
        <TabMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="flex gap-4 overflow-x-auto my-4">
          {categories &&
            categories.map &&
            categories.map((category) => (
              <Chip
                key={category.id}
                selected={category.id === selectedCategory}
                onClick={() => handleClick(category.id)}
              >
                {category.category}
              </Chip>
            ))}
        </div>

        {categories && categories.length > 0 && (
          <AddLibrary category={categories} />
        )}

        <div>
          {libraries &&
            libraries.map &&
            libraries.map((item) => (
              <LibraryItem
                key={item.id}
                id={item.id}
                category={item.category}
                date={item.created_at}
                userName={item.name}
                profileURL={item.profile}
                title={item.title}
                description={item.data}
              />
            ))}
        </div>
      </div>
      <div style={{ marginTop: "15vh" }} className="1/4">
        <ExpertPage />
      </div>
    </div>
  );
};

const Chip = ({ children, selected, className, onClick }) => {
  return (
    <div
      style={{ backgroundColor: selected ? Utils.color.secondary : "" }}
      onClick={onClick}
      className={` rounded-full px-4 py-1 cursor-pointer ${
        selected ? "text-white" : "bg-white text-black"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const TabMenu = ({ selectedTab, setSelectedTab }) => {
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        color="secondary"
        value={selectedTab}
        onChange={handleChange}
        aria-label="secondary tabs example"
        TabIndicatorProps={{
          sx: {
            backgroundColor: Utils.color.secondary,
          },
        }}
      >
        <Tab
          sx={{
            color: Utils.color.white,
            "&.Mui-selected": {
              color: Utils.color.secondary,
            },
          }}
          value={0}
          label="Previous Cases"
        />
        <Tab
          sx={{
            color: Utils.color.white,
            "&.Mui-selected": {
              color: Utils.color.secondary,
            },
          }}
          value={1}
          label="Laws/Rules"
        />
      </Tabs>
    </Box>
  );
};

export default Library;
