import React , {useContext} from 'react'
import Stories from '../../componants/stories/Stories'
import Posts from '../../componants/posts/Posts'
import './home.scss'
import Share from "../../componants/share/Share"
import { AuthContext } from '../../context/authContext'
import { Navigate } from 'react-router-dom'
const Home = () => {
  // const navigate = Navigate()
  const {currentUser } = useContext(AuthContext)
  // if(!currentUser){
  //   return navigate("/login")
  // }

  console.log(currentUser)
 return(
  <div className='home'>
    <Stories /> 
    <Share />
    <Posts />
  </div>
 )
}

export default Home