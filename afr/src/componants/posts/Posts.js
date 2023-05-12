import React , { useEffect} from 'react'
import Post from "../post/Post"
import "./posts.scss"
import axios from "axios"
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
  makeRequest.get("/post?userId="+userId).then((res) => {
    return res.data;
  })
);

// console.log(data)
  

  return (
    <div className="posts">
    {error
      ? "Something went wrong!"
      : isLoading
      ? "loading"
      : data.map((post) =>{
        return(
          <Post post={post} key={post.id} />)}
        )
      } 
  </div>
  )
}

export default Posts
