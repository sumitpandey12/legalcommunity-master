import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../Utils/Avatars";
import Button from "../../Utils/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FeedItem from "../Home/Feed/FeedItem";
import LibraryItem from "../../Utils/LibraryPostCard";
import UserContoller from "../../APIs/UserController";
import AuthContext from "../../Context/AuthContext";
import Modal from "../../Utils/Modal";
import Spinner from "../../Utils/Spinner";
import { useParams } from "react-router-dom";
import InputBox from "../../Utils/inputBox";
import { Badge, Menu, MenuItem } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import Utils from "../../Utils/Utils";
import { FaArrowTrendUp } from "react-icons/fa6";

const Account = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [user, setUser] = React.useState(null);
  const [queries, setQueries] = React.useState([]);
  const [cases, setCases] = React.useState([]);
  const [isExpertLoading, setExpertLoading] = React.useState(false);
  const [isPromotedLoading, setPromotedLoading] = React.useState(false);

  const userController = new UserContoller();

  const authContext = React.useContext(AuthContext);

  const params = useParams();

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const id = params.id;
    const response = await userController.getUserProfile(id);
    const queries = await userController.getMyQuery(id);
    if (response?.user_type === "Lawyer") {
      getCases();
    }

    setQueries(queries);
    setUser(response);
    console.log("User", response);
  };

  const applyExpertHandler = async () => {
    if (isExpertLoading) {
      return;
    }
    setExpertLoading(true);
    const response = await userController.applyForExpert();
    console.log(response);
    setExpertLoading(false);
  };

  const getCases = async () => {
    console.log("Loading Cases...");
    const response = await userController.getMyCases(params.id);
    setCases(response);
    console.log("Get My Cases", response);
  };

  if (user === null) return <Spinner />;

  return (
    <>
      {user && (
        <div
          style={{ backgroundColor: Utils.color.primary }}
          className="w-full flex flex-col items-center p-4"
        >
          <div className="flex gap-4 border-b border-gray-500 pb-4 w-full">
            <Avatar
              image={
                user.profile ??
                "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              className={"w-28 h-28"}
            />
            <div className="flex flex-col gap-1 justify-center items-center">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-xl text-white">{user.email}</p>
              {authContext.user && authContext.user?.id === user.id && (
                <EditProfileModal user={user} />
              )}
            </div>
            <div className="flex gap-4 justify-center items-center border-l pl-4 border-r border-gray-500 pr-4">
              <FollowerModal
                title={"Followers"}
                count={user?.follower_count}
                followers={user?.followers}
                isActive={user?.id === authContext?.user?.id}
              />
              <FollowerModal
                title={"Following"}
                count={user?.following_count}
                followers={user?.followings}
                isActive={user?.id === authContext?.user?.id}
              />
            </div>
            <div className="flex flex-col gap-2">
              {authContext.user &&
                user.id == authContext?.user?.id &&
                user?.user_type === "User" && (
                  <Button
                    isLoading={isExpertLoading}
                    title="Apply for Expert"
                    className="bg-red-900"
                    onClick={applyExpertHandler}
                  />
                )}
              {authContext.user && user?.id !== authContext?.user?.id && (
                <RequestExpertModal userId={user.id} />
              )}
              {authContext.user &&
              user?.id === authContext?.user?.id &&
              user?.user_type == "Lawyer" &&
              user.is_promoted == 1 ? (
                <Button
                  title={
                    user.is_promoted == 0
                      ? "Request Promotion"
                      : "Promotion Pending"
                  }
                  isLoading={isPromotedLoading}
                  disable={!user.is_promoted == 0}
                  className="bg-white"
                  onClick={async () => {
                    if (isPromotedLoading) {
                      return;
                    }
                    setPromotedLoading(true);
                    if (!user.is_promoted == 0) {
                      return;
                    }
                    await userController.requestPromotions();
                    setPromotedLoading(false);
                    getUser();
                  }}
                />
              ) : (
                <div className="p-4">
                  <FaArrowTrendUp color="red" size={28} />
                </div>
              )}
            </div>
            <MoreUserMenu user={user} />
          </div>
          <TabMenu
            isUser={user?.user_type !== "User"}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === 0 && (
            <LegalQueryPost
              isHide={authContext?.user?.id == user?.id}
              queries={queries}
            />
          )}
          {authContext.user &&
            user.id === authContext?.user?.id &&
            user?.user_type === "Lawyer" &&
            selectedTab === 1 && <LibraryPost cases={cases} />}
        </div>
      )}
    </>
  );
};

const FollowerModal = ({ count, title, followers, isActive }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div
        onClick={(e) => {
          if (!isActive) return;
          setOpen(true);
        }}
        className="flex flex-col gap-1 justify-center items-center cursor-pointer"
      >
        <p className="text-xl font-bold text-white">{title}</p>{" "}
        <p className="text-xl text-white">{count ?? 0}</p>
      </div>
      <Modal show={open} onClose={() => setOpen(false)}>
        <p className="text-xl font-bold text-white">{title}</p>
        <div className="h-[1px] w-full bg-gray-400 my-2"></div>
        <div className="flex flex-col gap-1">
          {followers?.map((follower) => (
            <div
              className="flex flex-col items-start border-b border-gray-500 py-2"
              key={follower.id}
            >
              <p className="text-md font-semibold text-white">
                {follower.name}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const LegalQueryPost = ({ queries, isHide }) => {
  if (!queries || queries == null || queries.length == 0) {
    return <p className="text-white">No Legal Query</p>;
  }
  return (
    <div className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col items-start justify-start gap-4">
        {queries &&
          queries.map &&
          queries.map((post) => (
            <FeedItem
              hideFollow={isHide}
              key={post.id}
              auther_id={post.author_id}
              comment_count={post.comment_count}
              description={post.query_content}
              image_url={post.file}
              full_name={post.name}
              user_profile={post.profile}
              date={post.date}
              id={post.id}
              is_following={post.is_following}
              like_count={post.vote_count}
            />
          ))}
      </div>
    </div>
  );
};

const LibraryPost = ({ cases }) => {
  if (cases == null || cases.length === 0) {
    return <p className="text-white">No Library</p>;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      {cases.map((post) => (
        <LibraryItem
          key={post.id}
          category={post.category}
          date={post.created_at}
          description={post.data}
          profileURL={post.profile}
          title={post.title}
          userName={post.name}
        />
      ))}
    </div>
  );
};

const TabMenu = ({ selectedTab, setSelectedTab, isUser }) => {
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
          label="Legal Query"
        />
        {isUser && (
          <Tab
            sx={{
              color: Utils.color.white,
              "&.Mui-selected": {
                color: Utils.color.secondary,
              },
            }}
            value={1}
            label="Library"
          />
        )}
      </Tabs>
    </Box>
  );
};

const RequestExpertModal = ({ userId }) => {
  const [show, setShow] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const titleRef = useRef(null);

  const requestExpertHandler = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    const title = titleRef.current.value;
    if (title.length < 5) return;

    const response = await new UserContoller().requestConsultation({
      expert_id: userId,
      title: title,
    });
    console.log(response);
    setShow(false);
    setLoading(false);
  };

  return (
    <div>
      <Button title="Request Expert" onClick={() => setShow(!show)} />
      <Modal show={show} onClose={() => setShow(!show)}>
        <h1 className="text-2xl font-bold text-white">Request Expert</h1>
        <textarea
          ref={titleRef}
          className="border rounded-lg border-gray-500 px-4 py-2 my-6 w-full"
          placeholder="Enter Description"
        />
        <Button
          isLoading={isLoading}
          title="Request"
          onClick={requestExpertHandler}
        />
      </Modal>
    </div>
  );
};

const EditProfileModal = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const [isFile, setFile] = React.useState(false);
  const [name, setName] = React.useState(user.name);
  const [isLoading, setLoading] = React.useState(false);

  const authContext = React.useContext(AuthContext);

  const handleFileUpload = async (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    if (name && name.length < 4) {
      alert("Name should be atleast 4 characters long");
      return;
    }

    console.log(name);

    const query = new FormData();
    if (isFile !== false) {
      query.append("file", isFile);
    }
    query.append("name", name);
    const response = await authContext.updateProfile(query);
    setLoading(false);
    console.log(response);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(!open)} title="Edit Profile">
        Edit Profile
      </Button>
      <Modal show={open} onClose={() => setOpen(!open)}>
        <h1 className="text-xl font-bold mb-6">Edit Profile</h1>
        <div className="w-full flex flex-col items-center gap-4">
          <input
            hidden
            type="file"
            id="fileUpload"
            onChange={handleFileUpload}
          />
          <Badge
            badgeContent={
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-950">
                <IoMdAdd color="white" />
              </div>
            }
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            className="cursor-pointer"
            onClick={() => document.getElementById("fileUpload").click()}
          >
            {isFile && (
              <img
                className="w-28 h-28 rounded-full"
                src={URL.createObjectURL(isFile)}
              />
            )}
            {!isFile && (
              <div className="w-28 h-28 rounded-full bg-gray-200 text-3xl flex items-center justify-center">
                {name && name[0] && name[0].toUpperCase()}
              </div>
            )}
          </Badge>
          <InputBox
            value={name}
            placeholder={name}
            onChange={(e) => {
              setName((prev) => e);
            }}
          />

          <Button
            isLoading={isLoading}
            title="Save"
            onClick={() => submitHandler()}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const MoreUserMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isRaiseQuery, setIsRaiseQuery] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const queryRef = useRef(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("clicked");
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    setIsRaiseQuery(true);
  };

  const raiseQuery = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    if (queryRef.current.value.length < 5) return;
    handleClose();
    const body = {
      reported_id: user.id,
      comment: queryRef.current.value,
    };
    const response = await new UserContoller().reportUser(body);
    console.log(response);
    setLoading(false);
    setIsRaiseQuery(false);
  };

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer p-2">
        <BsThreeDotsVertical color="#fff" />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleSubmit}>Report User</MenuItem>
      </Menu>

      <Modal
        className="w-1/3"
        show={isRaiseQuery}
        onClose={() => setIsRaiseQuery(false)}
      >
        <h1 className="text-xl font-bold">Raise Query</h1>
        <textarea
          ref={queryRef}
          className="w-full h-full border border-gray-300 h-56 my-2 p-1"
          placeholder="Write here..."
        />
        <Button isLoading={isLoading} title="Submit" onClick={raiseQuery} />
      </Modal>
    </div>
  );
};

export default Account;
