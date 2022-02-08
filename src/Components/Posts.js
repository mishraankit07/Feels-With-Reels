import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import Comment from './Comment';

function Posts({ userData }) {

    const [posts, setPosts] = useState(null);

    // console.log("posts component called");

    useEffect(() => {

        let postsArr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
            //console.log("snapshot:",snapshot);
            postsArr = [];
            snapshot.forEach((doc) => {
                // in the postData for every post we are also storing the name of the
                // document in which the post data is stored so that change in database
                // can be made easily
                let postData = { ...doc.data(), docId: doc.id }
                postsArr.push(postData);
            })

            // console.log("Posts Arr:",postsArr);
            setPosts(postsArr);
            console.log("Posts Data:",posts);
        })

        return unsub;
    }, [])

    const callback=(videos)=>{
        videos.forEach((video)=>{
            let videoElem=video.target.childNodes[1];
            // play all the video element for now

            // 2 options were available
            // 1) pause all, and play only the one in view
            // 2) play all, and pause all the ones not in view
            
            // why take 2nd route ? video.play() is an async function
            // so we wouldn't know when current video will play if we take the first route 

            videoElem.play().then(()=>{
                // if current video is not in view then pause it
                if(videoElem.paused==false && video.isIntersecting==false){
                    videoElem.pause();
                }
            })
        })
    }


    let observer=new IntersectionObserver(callback,{threshold:0.6});

    useEffect(()=>{
        let videosCont=document.querySelectorAll('.video-cont');

        videosCont.forEach((element)=>{
            console.log("video parent:",element);
           observer.observe(element);
        })
    },[posts])


    // console.log("user data:",userData);
    return (
        <div style={{marginTop:"2rem"}}>
            {
                // if posts haven't loaded yet, or user not logged in then show loading
                (posts == null || userData == null) ? <CircularProgress color="secondary" style={{display: "flex", justifyContent: "center", alignItems: "center" }} /> :
                    <div className="videos-cont">
                        {
                            posts.map((post) => (
                                <React.Fragment key={post.docId}>
                                    <div className="video-cont">
                                        <div className="user-profile">
                                            <Avatar alt={post.userName} src={post.userProfile} />
                                            <h4> {post.userName} </h4>
                                        </div>
                                        <Video className="video-elem" src={post.postUrl} />
                                        <Like userData={userData} postData={post} />
                                        <Comment userData={userData} postData={post} />
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