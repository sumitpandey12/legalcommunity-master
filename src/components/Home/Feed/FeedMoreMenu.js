import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../../Utils/Modal";
import { FeedContext } from "../../../Context/FeedContext";
import UserContoller from "../../../APIs/UserController";
import AuthContext from "../../../Context/AuthContext";

const menuItems = [
  {
    id: 1,
    name: "Report Query",
  },
];

export default function FeedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [editShow, setEditShow] = React.useState(false);
  const feedContext = React.useContext(FeedContext);
  const queryRef = React.useRef();

  //Report
  const [showReport, setShowReport] = React.useState(false);
  const reportRef = React.useRef();
  const userController = new UserContoller();
  const authContext = React.useContext(AuthContext);

  const reportPostHandler = async (message) => {
    const response = await userController.reportQuery({
      reported_id: props.id,
      comment: message,
    });
    setShowReport(false);
    console.log(response);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (item) => {
    if (item.id === 1) {
      setShowReport(true);
      return;
    } else if (item.id === 2) {
      setEditShow(true);
    } else if (item.id === 3) {
      deleteHandler();
    }
    handleClose();
  };

  const modifyHandler = async (query) => {
    const response = await feedContext.modifyPost(props.id, query);
    console.log(response);
    if (response) {
      setEditShow(false);
    }
  };

  const deleteHandler = async () => {
    const response = await userController.deleteQuery({
      query_id: props.id,
    });
    feedContext.refresh();
    console.log(response);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical size={25} />
      </Button>

      <Modal show={editShow} onClose={() => setEditShow(false)}>
        <h1 className="text-xl font-bold">Modify Query</h1>
        <textarea
          ref={queryRef}
          className="w-full h-full border border-gray-300 h-56 my-2 p-1"
          placeholder="Write here..."
        />

        <Button
          variant="contained"
          onClick={() => modifyHandler(queryRef.current.value)}
          className="w-full"
          color="success"
        >
          Modify
        </Button>
      </Modal>

      {/* Report Modal */}

      <Modal show={showReport} onClose={() => setShowReport(false)}>
        <h1 className="text-xl font-bold">Report Message</h1>
        <textarea
          ref={reportRef}
          className="w-full h-full border border-gray-300 h-56 my-2 p-1"
          placeholder="Write here..."
        />

        <Button
          variant="contained"
          onClick={() => reportPostHandler(reportRef.current.value)}
          className="w-full"
          color="success"
        >
          Report
        </Button>
      </Modal>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleMenu({ id: 1 })}>
          <div>Report Query</div>
        </MenuItem>
        {authContext.user && authContext.user.id === props.author_id && (
          <MenuItem
            onClick={() => {
              setEditShow(true);
            }}
          >
            <div className="text-red">Edit Query</div>
          </MenuItem>
        )}
        {authContext.user && authContext.user.id === props.author_id && (
          <MenuItem
            onClick={() => {
              handleClose();
              deleteHandler();
            }}
          >
            <div className="text-red">Delete</div>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
