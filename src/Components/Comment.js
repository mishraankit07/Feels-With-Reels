import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CommentLike from './CommentLike';
import AddComment from './AddComment';
import GetComments from './GetComments';
import './Comment.css';

function Comment({ userData, postData }) {

    // console.log("user data from comment:",userData);
    // console.log("post data from comment:",postData);

    // we can't open a modal based on a true/false value
    // since there are many posts passed here via map function in Posts.js
    // so for every post a new modal will open up, so we need to add check regarding id
    // of the modal clicked 

    const [open, setOpen] = useState(null);

    const handleClickOpen = (postId) => {
        setOpen(postId);
    };

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <div>
            <ChatBubbleIcon className='chat-icon' onClick={() => handleClickOpen(postData.postId)} />
            <Dialog
                // only open the modal for the current post whose icon is clicked!
                open={postData.postId == open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth='lg'
            >

                <div className="comments-cont">
                    <Card className="user-comments">
                        <GetComments postData={postData}/>
                    </Card>

                    <Card className="post-add-comment-cont">
                    <Typography> {postData.likes.length == 0 ? '' : `Liked by ${postData.likes.length} users`}</Typography>
                        <div style={{display:"flex",alignItems: "center",justifyContent:"center", gap:"0.5rem",padding: "1rem"}}>
                            <CommentLike userData={userData} postData={postData} />
                            <AddComment userData={userData} postData={postData} />
                        </div>
                    </Card>
                </div>
            </Dialog>
        </div>
    );
}

export default Comment;
