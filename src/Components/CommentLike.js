import React,{useState,useEffect} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';
import './CommentLike.css';

function CommentLike({userData,postData}) {
    
    // state showing if current user has liked the post or not
    const [commentLike, setCommentLike] = useState(null);

    useEffect(() => {

        let userLike = false;
        // means user has liked the post
        if (postData.likes.includes(userData.userId)) {
            userLike = true;
        }

        else {
            userLike = false;
        }

        setCommentLike(userLike);
    }, [postData]);

    // run the useEffect whenever the postData changes i.e we get a new post
    // or data corresponding to current post changes

    let handleCommentLike = (e) => {
        // if the current user had liked the post and clicked on the like btn again
        // so he wants to unlike the post
        if (commentLike == true) {
            // for the current post, remove the id of current user
            let newPostData = postData.likes.filter((userId) => {
                return userId != userData.userId;
            })

            database.posts.doc(postData.docId).update({
                likes: newPostData
            })

            setCommentLike(false);
        }

        else {
            // for the current post, add the id of current user
            let newPostData = [...postData.likes, userData.userId];

            database.posts.doc(postData.docId).update({
                likes: newPostData
            })
            setCommentLike(true);
        }
    }

    return (
        <div>
            {
                commentLike != null ? (commentLike == true ? <FavoriteIcon className="comment-like" onClick={handleCommentLike} /> : <FavoriteIcon className="comment-dislike" onClick={handleCommentLike} />) :
                    <></>
            }
        </div>);
}

export default CommentLike;
