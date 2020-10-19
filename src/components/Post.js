import React, { useContext } from "react";
import { ContextProvider } from "../Global/Context";
import "../App.css";
import Comments from "./Comments";
const Post = () => {
  const { posts } = useContext(ContextProvider);
  return (
    <>
      {posts.map((data) => (
        <div className="posts" key={data.id}>
          <div className="posts__header">
            <div className="posts__header-avator">{data.username[0]}</div>
            <div className="posts__header-name">{data.username}</div>
          </div>
          <div className="posts__img">
            <img src={data.images} alt={data.images} />
          </div>
          <Comments id={data.id} />
        </div>
      ))}
    </>
  );
};
export default Post;
