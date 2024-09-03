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
import { Badge } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

const Account = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [user, setUser] = React.useState(null);
  const [queries, setQueries] = React.useState([]);
  const [cases, setCases] = React.useState([]);

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
    if (response.user_type === "Lawyer") {
      getMyCases();
    }

    setQueries(queries);
    setUser(response);
    console.log("User", response);
  };

  const applyExpertHandler = async () => {
    const response = await userController.applyForExpert();
    console.log(response);
  };

  const getMyCases = async () => {
    console.log("Loading Cases...");
    const response = await userController.getMyCases();
    setCases(response);
  };

  if (user === null) return <Spinner />;

  return (
    <>
      {user && (
        <div className="w-full flex flex-col items-center p-4">
          <div className="flex gap-4 border-b pb-4 w-full">
            <Avatar
              image={
                user.profile ??
                "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              className={"w-28 h-28"}
            />
            <div className="flex flex-col gap-1 justify-center items-center">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-xl">{user.email}</p>
              {authContext.user.id === user.id && (
                <EditProfileModal user={user} />
              )}
            </div>
            <div className="flex gap-4 justify-center items-center border-l pl-4 border-r pr-4">
              <FollowerModal
                title={"Followers"}
                count={user?.follower_count}
                followers={user?.followers}
                isActive={user?.id === authContext.user.id}
              />
              <FollowerModal
                title={"Following"}
                count={user?.following_count}
                followers={user?.followings}
                isActive={user?.id === authContext.user.id}
              />
            </div>
            <div className="flex flex-col gap-2">
              {user.id == authContext.user.id && user.user_type === "User" && (
                <Button
                  title="Apply for Expert"
                  className="bg-red-900"
                  onClick={applyExpertHandler}
                />
              )}
              {user.id !== authContext.user.id && (
                <RequestExpertModal userId={user.id} />
              )}
              {user.id === authContext.user.id &&
                user.user_type === "Lawyer" && (
                  <Button title="Request Promotion" className="bg-red-900" />
                )}
            </div>
            <div className="flex justify-center items-center cursor-pointer p-2">
              <BsThreeDotsVertical />
            </div>
          </div>
          <TabMenu
            isUser={user.user_type !== "User"}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === 0 && <LegalQueryPost queries={queries} />}
          {user.id === authContext.user.id &&
            user.user_type === "Lawyer" &&
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
        <p className="text-xl font-bold">{title}</p>{" "}
        <p className="text-xl">{count ?? 0}</p>
      </div>
      <Modal show={open} onClose={() => setOpen(false)}>
        <p className="text-xl font-bold">{title}</p>
        <div className="h-[1px] w-full bg-gray-400 my-2"></div>
        <div className="flex flex-col gap-1">
          {followers?.map((follower) => (
            <div
              className="flex flex-col items-start border-b py-2"
              key={follower.id}
            >
              <p className="text-md font-semibold">{follower.name}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const LegalQueryPost = ({ queries }) => {
  if (!queries || queries == null || queries.length == 0) {
    return <p>No Legal Query</p>;
  }
  return (
    <div className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col items-start justify-start gap-4">
        {queries.map((post) => (
          <FeedItem
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
    return <p>No Library</p>;
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
        indicatorColor="secondary"
      >
        <Tab value={0} label="Legal Query" />
        {isUser && <Tab value={1} label="Library" />}
      </Tabs>
    </Box>
  );
};

const RequestExpertModal = ({ userId }) => {
  const [show, setShow] = React.useState(false);

  const titleRef = useRef(null);

  const requestExpertHandler = async () => {
    const title = titleRef.current.value;
    if (title.length < 5) return;

    const response = await new UserContoller().requestConsultation({
      expert_id: userId,
      title: title,
    });
    console.log(response);
    setShow(false);
  };

  return (
    <div>
      <Button title="Request Expert" onClick={() => setShow(!show)} />
      <Modal show={show} onClose={() => setShow(!show)}>
        <h1 className="text-2xl font-bold">Request Expert</h1>
        <textarea
          ref={titleRef}
          className="border rounded-lg border-gray-300 px-4 py-2 my-6 w-full"
          placeholder="Enter Description"
        />
        <Button title="Request" onClick={requestExpertHandler} />
      </Modal>
    </div>
  );
};

const EditProfileModal = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const [isFile, setFile] = React.useState(false);
  const [name, setName] = React.useState(user.name);

  const authContext = React.useContext(AuthContext);

  const handleFileUpload = async (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
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

          <Button title="Save" onClick={() => submitHandler()}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Account;
