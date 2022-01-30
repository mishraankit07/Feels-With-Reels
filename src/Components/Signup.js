import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from '../images/logo.png'
import { makeStyles } from '@mui/styles';
import './Signup.css';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function SignUp() {

    const userStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },

        loginCard: {
            height: '5vh',
            width: '30vw',
            textAlign: 'center',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    const classes = userStyles()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // for storing profile pick
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    let handleSignup = async () => {
        if (file == null) {
            setError('Please Put your profile picture first!');

            setTimeout(() => {
                setError('');
            }, 2000)

            return;
        }

        try {
            // no error for now
            setError('');
            // work hasn't been complete yet
            setLoading(true);

            let userObj = await signup(email, password);
            console.log("userObj:", userObj);
            let userId = userObj.user.uid;
            const uploadTask = storage.ref(`/users/${userId}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} % done`);
            }

            function fn2(error) {
                console.log('error while profile pic uploading:', error);
                setError(error);
            }

            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    console.log("time stamp:", database.getTimeStamp);

                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;

                    database.users.doc(userId).set({
                        email: email,
                        userId: userId,
                        fullName: name,
                        profileImgUrl: url,
                        createdAt: dateTime
                    })
                })

                setLoading(false);
                // means signup is done so take him to the feed
                navigate('/');
            }

            console.log(userObj);
        }

        catch (err) {
            setError(err);

            setTimeout(() => {
                setError('');
            }, 2000)
        }
    }

    return (
        <div className="signup-cont">
            <div className="signup-card">
                <Card variant="outlined">
                    <div class="signup-logo">
                        <img src={logo}></img>
                    </div>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} className={classes.text1}>
                            Sign Up to see photos and videos from friends
                        </Typography>

                        {
                            error != "" && <Alert severity="error"> {error} </Alert>
                        }

                        <TextField size="small" id="outlined-basic" margin="dense" label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField size="small" id="outlined-basic" margin="dense" label="Password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField size="small" id="outlined-basic" margin="dense" label="Full Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />

                        <div style={{ marginTop: "1rem" }}>
                            <Button size="small" color="secondary" variant="outlined" margin="dense" fullWidth startIcon={<CloudUploadIcon />}> Upload Profile Image
                                <input type="file" accept='image/*' onChange={(e) => {
                                    console.log("files", e.target.files);
                                    setFile(e.target.files[0])
                                    console.log("file only:", file);
                                }
                                } />
                            </Button>
                        </div>

                        <Button style={{ marginTop: "1rem" }} size="small" color="secondary" variant="outlined" margin="dense" variant="contained" color="primary" fullWidth onClick={handleSignup} disabled={loading}>
                            Sign Up
                        </Button>

                        <Typography sx={{ fontSize: 14 }} className={classes.text1}>
                            By Signing Up, you agree to our terms, conditions and cookies policy.
                        </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>

                <Card variant="outlined" className={classes.loginCard}>
                    <CardContent>
                        <Typography> Having An account ? <Link to="/Login"> Login </Link> </Typography>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}