import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { database } from '../firebase';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';
import './Profile.css';
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
import CommentLike from './CommentLike';
import AddComment from './AddComment';
import GetComments from './GetComments';
import './Comment.css';

function Profile() {

    const [open, setOpen] = useState(null);

    const handleClickOpen = (postId) => {
        setOpen(postId);
    };

    const handleClose = () => {
        setOpen(null);
    };

    console.log("profile component is called");

    // user id (doc id) of the user whose profile is clicked
    const params = useParams();
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);

    // fetch the data of user from database
    useEffect(() => {
        database.users.doc(params.userId).onSnapshot((snap) => {
            setUserData(snap.data());
        })
        //console.log("userData:", userData);
    }, [userData])

    useEffect(async () => {

        let updatedPostsArr = [];
        if (userData != null) {
            for (let i = 0; i < userData.postIds.length; i++) {
                let postId = userData.postIds[i];
                let data = await database.posts.doc(postId).get();
                updatedPostsArr.push(data.data());
            }
        }

       // console.log("posts data:", updatedPostsArr);
        setPostData(updatedPostsArr);
    }, [postData])

    return (
        <div>
            {
                (userData == null || postData == null) ? <CircularProgress color="inherit" /> :
                    <div class="profile-cont">
                        <Navbar userData={userData} />
                        <div className='user-data-cont'>
                            <div className="user-data">
                                <img alt={userData.fullName} className="user-img" src={userData.profileImgUrl} />

                                <div class="user-info">
                                    <Typography variant="h5" component="h5">
                                        Name : {userData.fullName}
                                    </Typography>

                                    <Typography variant="h5" component="h5">
                                        Email : {userData.email}
                                    </Typography>

                                    <Typography component="h5" variant="h5">
                                        Posts : {userData.postIds.length}
                                    </Typography>
                                </div>
                            </div>
                            <div classes="horizontal-line"></div>
                        </div>
                        <div class="profile-posts-cont">
                            {
                                postData.map((post) => (
                                    <React.Fragment>
                                        <div class="profile-video-cont">
                                            <video muted="muted" className="profile-video-elem" src={post.postUrl} onClick={() => { handleClickOpen(post.postId) }} />
                                        </div>

                                        <Dialog
                                            // only open the modal for the current post whose icon is clicked!
                                            open={post.postId == open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='lg'
                                        >

                                            <div className="post-comments-cont">
                                                <Card className="post-video-cont">
                                                    <video src={post.postUrl} controls />
                                                </Card>
                                                <div className="post-user-comments-cont">
                                                    <Card className="post-user-comments">
                                                        <GetComments postData={post} />
                                                    </Card>

                                                    <Card className="post-add-comment-cont">
                                                        <Typography> {post.likes.length == 0 ? '' : `Liked by ${post.likes.length} users`}</Typography>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "1rem" }}>
                                                            <CommentLike userData={userData} postData={post} />
                                                            <AddComment userData={userData} postData={post} />
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>);
}

export default Profile;
