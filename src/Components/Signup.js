import * as React from 'react';
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
import { Link } from 'react-router-dom';
import { textAlign } from '@mui/system';

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

    return (
        <div className="login-cont">
            <div className="login-card">
                <Card variant="outlined">
                    <div class="login-logo">
                        <img src={logo}></img>
                    </div>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} className={classes.text1}>
                            Sign Up to see photos and videos from friends
                        </Typography>

                        {
                            true && <Alert severity="error">This is an error alert — check it out!</Alert>
                        }

                        <TextField size="small" id="outlined-basic" margin="dense" label="Email" variant="outlined" fullWidth />
                        <TextField size="small" id="outlined-basic" margin="dense" label="Password" variant="outlined" fullWidth />
                        <TextField size="small" id="outlined-basic" margin="dense" label="Full Name" variant="outlined" fullWidth />


                        <Button size="small" color="secondary" variant="outlined" margin="dense" variant="contained" color="primary" fullWidth>
                            Sign Up
                        </Button>

                        <div style={{ marginTop: "1rem" }}>
                            <Button size="small" color="secondary" variant="outlined" margin="dense" fullWidth startIcon={<CloudUploadIcon />}> Upload Profile Image
                                <input type="file" accept='image/*' hidden />
                            </Button>
                        </div>

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