import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like.js';

function Posts({ userData }) {

    const [posts, setPosts] = useState(null);

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
            // console.log("Posts Data:",posts);
        })

        return unsub;
    }, [])

    // console.log("user data:",userData);
    return (
        <div>
            {
                // if posts haven't loaded yet, or user not logged in then show loading
                (posts == null || userData == null) ? <CircularProgress color="secondary" /> :
                    <div className="videos-cont">
                        {
                            posts.map((post) => (
                                <React.Fragment>
                                    <div className="video-cont">
                                        <div className="user-profile">
                                            <Avatar alt={post.userName} src={post.userProfile} />
                                            <h4> {post.userName} </h4>
                                        </div>
                                        <Video className="video-elem" src={post.postUrl} />
                                        <Like userData={userData} postData={post}/>
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