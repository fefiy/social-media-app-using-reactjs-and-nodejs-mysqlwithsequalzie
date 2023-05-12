import React from "react";
import './stories.scss'
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser.profilePic)
  const storie = [
    {
      id: 1,
      img: "https://media.istockphoto.com/id/1353767191/photo/portrait-of-positive-cheerful-fashionable-woman-in-casual-t-shirt-for-mock-up-isolated-on.jpg?s=612x612&w=0&k=20&c=im5xToG7dZvDZLAiwoWiFujNUlIVx2PTfp3w0ZcBhSI=",
      name: "fozi yimam",
    },
    {
      id: 2,
      img: "https://media.istockphoto.com/id/1353767191/photo/portrait-of-positive-cheerful-fashionable-woman-in-casual-t-shirt-for-mock-up-isolated-on.jpg?s=612x612&w=0&k=20&c=im5xToG7dZvDZLAiwoWiFujNUlIVx2PTfp3w0ZcBhSI=",
      name: "fozi yimam",
    },
    {
      id: 3,
      img: "https://media.istockphoto.com/id/1353767191/photo/portrait-of-positive-cheerful-fashionable-woman-in-casual-t-shirt-for-mock-up-isolated-on.jpg?s=612x612&w=0&k=20&c=im5xToG7dZvDZLAiwoWiFujNUlIVx2PTfp3w0ZcBhSI=",
      name: "fozi yimam",
    },
    {
      id: 4,
      img: "https://media.istockphoto.com/id/1353767191/photo/portrait-of-positive-cheerful-fashionable-woman-in-casual-t-shirt-for-mock-up-isolated-on.jpg?s=612x612&w=0&k=20&c=im5xToG7dZvDZLAiwoWiFujNUlIVx2PTfp3w0ZcBhSI=",
      name: "fozi yimam",
    },
  ];
  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} />
        <span>{currentUser.name}</span>
        <button>p</button>
      </div>
      {storie.map((story) => {
        return (
          <div key={story.id} className="story">
            <img src={story.img} />
            {console.log(story.name)}
            <span>{story.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
