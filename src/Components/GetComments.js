import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase';
import Typography from '@mui/material/Typography';
import './GetComments.css';

function GetComments({ postData }) {

    //console.log("get comments from profile:");
    const [comments, setComments] = useState(null);

    useEffect(async() => {
        let commentsData = [];

        for (let i = 0; i < postData.comments.length; i++) {
            let commentDocId = postData.comments[i].id;
            // console.log('comment document id:', commentDocId);
            let commentData = await database.comments.doc(commentDocId).get();
            console.log("comment data:", commentData.data());
            commentsData.push(commentData.data());
        }

        // console.log("comments in post data:",postData.comments);
       // console.log("comments data:", commentsData);
        setComments(commentsData);
    },[postData])

    return (
        <div class="comments-cont">
            {
                comments == null ? <CircularProgress /> :
                    comments.map((commentObj) => (
                        <div className="comment">
                            <div className="commenter-info">
                                <Avatar style={{width:"1.5rem",height:"1.5rem"}} alt={commentObj.userName} src={commentObj.userProfileImgUrl} />
                                <Typography> {commentObj.userName} </Typography>
                            </div>
                            <Typography> {commentObj.text} </Typography>
                        </div>
                    ))
            }
        </div>
    );
}

export default GetComments;
