import React,{ useState, useEffect, useContext } from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';

function Posts({userData}){
    
    const [posts,setPosts]=useState(null);

    useEffect(()=>{

        let postsArr=[];
        const unsub=database.posts.orderBy('createdAt','desc').onSnapshot((snapshot)=>{
            //console.log("snapshot:",snapshot);
            postsArr=[];
            snapshot.forEach((doc)=>{
                let postData={...doc.data(),postId:doc.id}
                postsArr.push(postData);
            })

            // console.log("Posts Arr:",postsArr);
            setPosts(postsArr);
            // console.log("Posts Data:",posts);
        })

        return unsub;
    },[])    

    console.log("Posts Arr from outside:",posts);
    // console.log("user data:",userData);
    return (
        <div>
            {
                // if posts haven't loaded yet, or user not logged in then show loading
               (posts==null || userData==null) ? <CircularProgress color="secondary" /> : 
               <div className="video-cont">
                   {
                        posts.map((post)=>(
                            <React.Fragment>
                                <div className="video">
                                    <Video src={post.postUrl}/>
                                </div>
                            </React.Fragment>   
                        ))
                        }
               </div>
  
            }
        </div>
    )
}

export default Posts;