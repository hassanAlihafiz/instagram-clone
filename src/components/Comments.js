import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { db } from "../config/Firebase";
import { ContextProvider } from "../Global/Context";
const Comments = (props) => {
  const { user, loader, publishComment } = useContext(ContextProvider);
  const [state, setState] = useState("");
  const [comments, setComments] = useState([]);
  const post_comment = (e) => {
    e.preventDefault();
    publishComment({ id: props.id, comment: state });
    setState("");
  };

  useEffect(() => {
    db.collection("posts")
      .doc(props.id)
      .collection("comments")
      .orderBy("currentTime", "desc")
      .onSnapshot((snp) => {
        setComments(snp.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comments__container" key={comment.id}>
          <div className="comments__container-name">{comment.username}</div>
          <div className="comments__container-msg">{comment.comment}</div>
        </div>
      ))}
      <div className="comments__section">
        {!loader && user ? (
          <form onSubmit={post_comment}>
            <input
              type="text"
              className="comment_input"
              placeholder="Add a comment"
              required
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
            <Button />
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Comments;
