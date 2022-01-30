import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from '../images/logo.png'
import login_phone from '../images/login_phone.png';
import login_img1 from '../images/login_img1.jpg';
import login_img2 from '../images/login_img2.jpg';
import login_img3 from '../images/login_img3.jpg';
import login_img4 from '../images/login_img4.jpg';
import login_img5 from '../images/login_img5.jpg';
import { makeStyles } from '@mui/styles';
import './Login.css';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { AuthContext } from '../Context/AuthContext';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Login() {
    
    const store=useContext(AuthContext);
    console.log(store);
    
    const userStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },

        text2: {
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
            <div className="phone-card" style={{ backgroundImage: `url(${login_phone})`, backgroundSize: 'cover' }}>
                <div className="phone">
                    <CarouselProvider
                        naturalSlideWidth={110}
                        naturalSlideHeight={180}
                        visibleSlides={1}
                        totalSlides={5}
                        autoPlay={true}
                        infinte={true}
                        isPlaying={true}
                        dragable={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image src={login_img1} /></Slide>
                            <Slide index={1}><Image src={login_img2} /></Slide>
                            <Slide index={2}><Image src={login_img3} /></Slide>
                            <Slide index={3}><Image src={login_img4} /></Slide>
                            <Slide index={4}><Image src={login_img5} /></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>

            <div className="login-card">
                <Card variant="outlined">
                    <div class="login-logo">
                        <img src={logo}></img>
                    </div>
                    <CardContent>

                        {
                            true && <Alert severity="error">This is an error alert — check it out!</Alert>
                        }

                        <TextField size="small" id="outlined-basic" margin="dense" label="Email" variant="outlined" fullWidth />
                        <TextField size="small" id="outlined-basic" margin="dense" label="Password" variant="outlined" fullWidth />

                        <Typography sx={{ fontSize: 14 }} className={classes.text2} color="primary">
                            Forgot Password ?
                        </Typography>
                        <Button size="small" color="secondary" variant="outlined" margin="dense" variant="contained" color="primary" fullWidth>
                            Log In
                        </Button>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>

                <Card variant="outlined" className={classes.loginCard}>
                    <CardContent>
                        <Typography> Don't Have An account ? <Link to="/Signup"> Signup </Link> </Typography>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}