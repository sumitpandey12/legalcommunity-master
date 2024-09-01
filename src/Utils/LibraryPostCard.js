import React from "react";

const LibraryItem = ({
  userName,
  title,
  profileURL,
  description,
  date,
  category,
}) => {
  const newDate = new Date(date).toDateString();

  return (
    <div className="flex items-center justify-start h-min my-3">
      <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`h-8 w-8 rounded-full bg-slate-400 bg-[url(${profileURL})]`}
            ></div>
            <div className="text-lg font-bold text-slate-700">{userName}</div>
          </div>
          <div className="flex items-center space-x-8">
            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
              {category}
            </button>
            <div className="text-xs text-neutral-500">{newDate}</div>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold text-left">{title}</div>
          <div className="text-sm text-neutral-600 text-left">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryItem;
