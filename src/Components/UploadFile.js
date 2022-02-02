import { Button } from '@mui/material';
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { database, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

function UploadFile(props) {

    // console.log("Props:", props);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    let handleVideoUpload = async (file) => {
        if (file == null) {
            setError("Please Add a valid file!");

            setTimeout(() => {
                setError('');
            }, 2000)

            return;
        }

        // assign a unique id to each post
        let pid = uuidv4();
        setLoading(true);
        
        // in storage.ref we provide the address where we want to put the file in storage            
        const uploadTask = storage.ref(`/posts/${pid}/${file.name}`).put(file);

        uploadTask.on('state_changed', fn1, fn2, fn3);

        // handles progress
        function fn1(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} % done`);
        }

        // handles error
        function fn2(error) {
            console.log('error while profile pic uploading:', error);
            setError(error);
        }

        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {

                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;

                let postObj = {
                    likes: [],
                    comments: [],
                    postId: pid,
                    postUrl: url,
                    userName: props.user.fullName,
                    userProfile: props.user.profileImgUrl,
                    userId: props.user.userId,
                    createdAt: dateTime
                }

                database.posts.add(postObj).then(async (ref) => {

                    console.log("ref", ref);

                    let response = await database.users.doc(props.user.userId).update({
                        postIds: [...props.user.postIds, ref.id]
                    })
                }).then(() => {
                    setLoading(false);
                }).catch((err) => {
                    setError(err);
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                    setLoading(false);
                })
            })
            // console.log("post object:", postObj);
            setLoading(false);
        }
    }

    return (
        <div>

            {
                error != "" ? <Alert severity="error">This is an error alert — check it out!</Alert> :
                    <>
                        <input type="file" accept="video/**" id="upload-input" style={{ opacity: "0" }} onChange={(e) => handleVideoUpload(e.target.files[0])} />
                        <label htmlFor='upload-input'>
                            <Button
                                variant="outlined"
                                color="secondary"
                                component="span"
                                disabled={loading}
                            >
                                Upload Video
                            </Button>
                        </label>
                        {loading && <LinearProgress color="secondary" />}
                    </>

            }

        </div>
    );
}

export default UploadFile;
