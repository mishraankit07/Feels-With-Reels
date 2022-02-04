import React,{useState,useEffect} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';
import './CommentLike.css';

function CommentLike({userData,postData}) {
    
    // state showing if current user has liked the post or not
    const [like, setLike] = useState(null);

    useEffect(() => {

        let userLike = false;
        // means user has liked the post
        if (postData.likes.includes(userData.userId)) {
            userLike = true;
        }

        else {
            userLike = false;
        }

        setLike(userLike);
    }, [postData, userData]);

    // run the useEffect whenever the postData changes i.e we get a new post
    // or data corresponding to current post changes

    let handleLike = (e) => {
        // if the current user had liked the post and clicked on the like btn again
        // so he wants to unlike the post
        if (like == true) {
            // for the current post, remove the id of current user
            let newPostData = postData.likes.filter((userId) => {
                return userId != userData.userId;
            })

            database.posts.doc(postData.docId).update({
                likes: newPostData
            })

            setLike(false);
        }

        else {
            // for the current post, add the id of current user
            let newPostData = [...postData.likes, userData.userId];

            database.posts.doc(postData.docId).update({
                likes: newPostData
            })
            setLike(true);
        }
    }

    return (
        <div>
            {
                like != null ? like == true ? <FavoriteIcon className="comment-like" onClick={handleLike} /> : <FavoriteIcon className="comment-dislike" onClick={handleLike} /> :
                    <></>
            }
        </div>);
}

export default CommentLike;
