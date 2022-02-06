import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@mui/styles';
import navLogo from '../images/nav_logo2.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles({
    navBag: {
        background: 'pink'
    }
})


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar({ userData }) {

    console.log("user data:", userData);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const classes = useStyles();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleProfileRedirect = () => {
        navigate(`/profile/${userData.userId}`);
    }

    const handleBannerClick = () => {
        navigate('/');
    }

    const handleLogout = async () => {
        try {
            await logout();
        }

        catch (err) {
            console.log(err);
        }
    }

    const handleExploreClick = () => {
        let win = window.open("https://www.google.com", '_blank');
        win.focus();
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleProfileRedirect} style={{ display: "flex", gap: "0.2rem" }}><AccountCircle /> Profile </MenuItem>
            <MenuItem onClick={handleLogout} style={{ display: "flex", gap: "0.2rem" }}><LogoutIcon /> Logout </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileRedirect} style={{ display: "flex", gap: "0.2rem" }}><AccountCircle /> Profile </MenuItem>
            <MenuItem onClick={handleLogout} style={{ display: "flex", gap: "0.2rem" }}><LogoutIcon /> Logout </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ background: "green" }}>
                <Toolbar>
                    <div>
                        <img src={navLogo} onClick={handleBannerClick} style={{ width: '200px', height: '80px' }} />
                    </div>

                    <Typography style={{marginLeft:"20vw",fontSize:"2rem",fontWeight:"bold"}}> Hi {userData.fullName} Welcome to feed! </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            style={{backgroundColor:'transparent'}}
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginRight: "2rem" }}>
                                <HomeIcon onClick={handleBannerClick} style={{height:"2rem",width:"2rem"}}/>
                                <ExploreIcon onClick={handleExploreClick} style={{height:"2rem",width:"2rem"}}/>
                                <Avatar alt={userData.fullName} src={userData.profileImgUrl} style={{height:"2rem",width:"2rem"}}/>
                            </div>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}