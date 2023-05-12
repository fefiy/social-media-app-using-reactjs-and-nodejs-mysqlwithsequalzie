import React, { useContext, useState } from "react";
import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../componants/posts/Posts";
import { useLocation } from "react-router-dom";
import { useQuery ,  useMutation , useQueryClient} from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Update from "../../componants/updates/Update";
const Profile = () => {
   
  const [openUPdate ,setOpenUpdate] = useState(false)
  const queryClient = useQueryClient()

  const userId = useLocation().pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const mutation = useMutation(
    (following) => {
      console.log("following", following)
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships?userId="+userId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

   console.log("relationdata", relationshipData)

  const handleFollow = ()=>{
    mutation.mutate(relationshipData.includes(currentUser.id))
  }

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={data.coverPic} alt="" className="cover" />
            <img src={data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon />
                </a>
              </div>
              <div className="center">
                <span>{data.firstname}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>lama.dev</span>
                  </div>
                </div>
                {data.id === currentUser.id ? (
                  <button onClick={()=>setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {rIsLoading ? "Loading": relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow" 
                      }
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>

              {openUPdate && <Update setOpenUpdate={setOpenUpdate} user={currentUser} />}
            </div>
            <Posts userId={userId} />
            {/* when go to that person profile we only went what that person is posted */}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
