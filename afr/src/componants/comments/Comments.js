import React, { useState } from "react";
import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  console.log("cooomm=>", data)

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      // if this is ok refetch it
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const { currentUser } = useContext(AuthContext);

  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "John Doe",
  //     userId: 1,
  //     profilePicture:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePicture:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  // ];

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} />
        <input
          type="text"
          value={desc}
          placeholder="write a comment .."
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>send </button>
      </div>
      {error
      ? "Something went wrong!"
      : isLoading 
      ? "loading":data.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <img src={comment.profilePic} />
            <div className="info">
              <span>{comment.firstname}</span>
              <p>{comment.description}</p>
            </div>
            <span className="date">{moment(comment.createsAt).fromNow()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
