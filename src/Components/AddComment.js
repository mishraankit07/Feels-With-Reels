import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './AddComment.css';
import Button from '@mui/material/Button';
import { database } from '../firebase';

function AddComment({ userData, postData }) {

    const [text, setText] = useState('');

    console.log("add comments called from post!");
    //console.log("user data in comments:", userData);
    //console.log("post data in comments:",postData);

    let handleCommentPost = async() => {

        //console.log("post called!");

        let postObj = {
            text: text,
            userName: userData.fullName,
            userProfileImgUrl: userData.profileImgUrl
        }

        // console.log("postObj:", postObj);

        let res=await database.comments.add(postObj);
        console.log("id of the document:",res.id);

        database.posts.doc(postData.docId).update({
            comments: [...postData.comments,res]
        })

        setText('');
    }

    return (
        <div style={{ width: "100%" }}>
            <TextField size="small" id="outlined-basic" label="Outlined" variant="outlined" value={text} onChange={(e) => {
                console.log("value of text in add comment:",e.target.value)
                setText(e.target.value)
                }
            } />
            <Button variant="contained" onClick={handleCommentPost}> Post </Button>
        </div>
    )
}

export default AddComment;
