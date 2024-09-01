import React from "react";
import Card from "./Card";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = (props) => {
  if (!props.show) return null;
  return (
    <div className="fixed flex justify-center items-center inset-0 z-50 bg-black bg-opacity-50">
      <Card className={`bg-white px-6 py-6 w-1/4 ${props.className}`}>
        <div className="flex justify-end">
          <div onClick={props.onClose} className="cursor-pointer">
            <IoIosCloseCircleOutline size={25} />
          </div>
        </div>
        <div className="py-6" onClick={(e) => e.stopPropagation()}>
          {props.children}
        </div>
      </Card>
    </div>
  );
};

export default Modal;
