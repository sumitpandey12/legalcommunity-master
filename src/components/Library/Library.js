import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LibraryItem from "../../Utils/LibraryPostCard";
import PublicController from "../../APIs/PublicController";

const Library = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(-1);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [libraries, setLibraries] = React.useState([]);
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="px-4 pt-4">
      <TabMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="flex gap-4 overflow-x-auto my-4">
        {categories.map((category) => (
          <Chip
            key={category.id}
            selected={category.id === selectedCategory}
            onClick={() => handleClick(category.id)}
          >
            {category.category}
          </Chip>
        ))}
      </div>
      <div>
        {libraries &&
          libraries.map((item) => (
            <LibraryItem
              key={item.id}
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
  );
};

const Chip = ({ children, selected, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={` rounded-full px-4 py-1 cursor-pointer ${
        selected ? "bg-orange-950 text-white" : "bg-orange-100 text-black"
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
        indicatorColor="secondary"
      >
        <Tab value={0} label="Previous Cases" />
        <Tab value={1} label="Rules/Regulations" />
      </Tabs>
    </Box>
  );
};

export default Library;
