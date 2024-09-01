import React, { useContext, useRef } from "react";
import Button from "../../Utils/Button";
import SearchBox from "./SearchBox";
import Modal from "../../Utils/Modal";
import Divider from "../../Utils/Divider";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { MdPostAdd } from "react-icons/md";
import AuthContext from "../../Context/AuthContext";
import ButtonWidet from "../../Utils/ButtonWidet";
import { RiImageAddLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import UserContoller from "../../APIs/UserController";
import { useFilePicker } from "use-file-picker";

const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isRaiseQuery, setIsRaiseQuery] = React.useState(false);
  const [isNotificationOpen, setNotificationOpen] = React.useState(false);

  const authContext = useContext(AuthContext);

  const queryRef = useRef("");
  const attachImageRef = useRef(null);

  const userController = new UserContoller();

  const toggleLogin = () => setShow(!show);
  const toggleRaiseQuery = () => setIsRaiseQuery(!isRaiseQuery);

  const [isFile, setFile] = React.useState(false);

  const { openFilePicker, filesContent, loading } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
  });

  const raiseQuery = async () => {
    if (queryRef.current.value.length < 5) return;

    const query = new FormData();
    query.append("query_content", queryRef.current.value);

    if (isFile !== false) {
      query.append("file", isFile);
    }

    console.log(query);
    const response = await userController.raiseQuery(query);
    if (response.code === 200) {
      setIsRaiseQuery(false);
    }
  };

  const handlerFileSelector = () => {
    openFilePicker();
    if (!loading && filesContent[0] !== undefined) {
      setFile(true);
      console.log(attachImageRef.current);
    }
  };

  const handlerFileUpload = (e) => {
    setFile(e.target.files[0]);
    console.log(isFile);
  };

  return (
    <header
      className={`sticky top-0 flex bg-white justify-between items-center p-4 border-b h-16 ${props.className}`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        className="h-6"
      />
      {authContext.user && authContext.user.name && (
        <p>{authContext.user.name}</p>
      )}
      <SearchBox />
      <div className="flex gap-4 items-center">
        <div
          onClick={() => setNotificationOpen(!isNotificationOpen)}
          className="relative cursor-pointer"
        >
          <IoMdNotifications size={28} />
          <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 right-1"></div>
        </div>
        {authContext.user !== null && (
          <ButtonWidet onClick={() => toggleRaiseQuery()}>
            <div className="flex gap-1">
              <MdPostAdd size={25} />
              <p>Legal Query</p>
            </div>
          </ButtonWidet>
        )}

        {authContext.user === null && (
          <Button title="Sign In" onClick={() => toggleLogin()} />
        )}

        {authContext.user !== null && (
          <Button
            title="Sign Out"
            className="bg-red-500 text-white"
            onClick={() => authContext.logout()}
          />
        )}
      </div>

      <NotificationModal
        show={isNotificationOpen}
        onClose={() => setNotificationOpen(false)}
      >
        <div className="flex flex-col justify-start mt-1 mb-4 h-1/4 overflow-y-auto">
          <div className="flex justify-between items-center border-b py-2">
            <div className="flex flex-col gap-1 justify-start items-start">
              <p className="text-lg font-bold">Sumit Pandey</p>
              <p className="text-sm">LGBTQ Legal Code</p>
              <p className="text-sm">Posted on 10/10/2022</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg text-blue-500">Accept</div>
              <div className="text-lg text-red-500">Reject</div>
            </div>
          </div>

          <div className="flex justify-between items-center border-b py-2">
            <div className="flex flex-col gap-1 justify-start items-start">
              <p className="text-lg font-bold">Sumit Pandey</p>
              <p className="text-sm">LGBTQ Legal Code</p>
              <p className="text-sm">Posted on 10/10/2022</p>
            </div>
            <div className="text-lg text-blue-500">Accept</div>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <div className="flex flex-col gap-1 justify-start items-start">
              <p className="text-lg font-bold">Sumit Pandey</p>
              <p className="text-sm">LGBTQ Legal Code</p>
              <p className="text-sm">Posted on 10/10/2022</p>
            </div>
            <div className="text-lg text-blue-500">Accept</div>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <div className="flex flex-col gap-1 justify-start items-start">
              <p className="text-lg font-bold">Sumit Pandey</p>
              <p className="text-sm">LGBTQ Legal Code</p>
              <p className="text-sm">Posted on 10/10/2022</p>
            </div>
            <div className="text-lg text-blue-500">Accept</div>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <div className="flex flex-col gap-1 justify-start items-start">
              <p className="text-lg font-bold">Sumit Pandey</p>
              <p className="text-sm">LGBTQ Legal Code</p>
              <p className="text-sm">Posted on 10/10/2022</p>
            </div>
            <div className="text-lg text-blue-500">Accept</div>
            <div className="text-lg text-red-500">Reject</div>
          </div>
        </div>
      </NotificationModal>

      <Modal
        className="w-1/3"
        show={isRaiseQuery}
        onClose={() => toggleRaiseQuery()}
      >
        <h1 className="text-xl font-bold">Raise Query</h1>
        <textarea
          ref={queryRef}
          className="w-full h-full border border-gray-300 h-56 my-2 p-1"
          placeholder="Write here..."
        />
        {isFile !== false && (
          <img
            ref={attachImageRef}
            src={URL.createObjectURL(isFile)}
            className="w-1/2 h-1/2"
          />
        )}

        <div className="flex justify-start mt-1 mb-4">
          <input
            hidden
            type="file"
            id="fileUpload"
            onChange={handlerFileUpload}
          />
          <div
            onClick={() => {
              document.getElementById("fileUpload").click();
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <RiImageAddLine size={18} color="rgb(67 20 7)" />
            <p className="text-sm text-orange-950">Attach Image</p>
          </div>
        </div>

        <Button title="Submit" onClick={raiseQuery} />
      </Modal>

      <Modal show={show} onClose={() => toggleLogin()}>
        {isLogin ? (
          <LoginForm
            onClose={() => toggleLogin()}
            onSignUp={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            onClose={() => toggleLogin()}
            onSignUp={() => setIsLogin(true)}
          />
        )}
      </Modal>
    </header>
  );
};

const NotificationModal = ({ show, children, onClose }) => {
  if (!show) return null;
  return (
    <div onClick={onClose} className="w-full h-full fixed z-50 right-0 top-16">
      <div className="fixed z-50 right-16 top-16 border bg-white w-1/4 h-2/4 shadow-lg overflow-auto">
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Header;
