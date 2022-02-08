import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import Avatar from '@mui/material/Avatar';


export default function PostNavbar({ userData }) {

    // console.log("user data:", userData);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

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
        let win = window.open("https://github.com/mishraankit07/Feels-With-Reels", '_blank');
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
            <MenuItem onClick={handleLogout} style={{ display: "flex", gap: "0.2rem" }}><LogoutIcon /> Logout </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ background: "#fd79a8" }}>
                <Toolbar>
                    <div style={{ cursor: "pointer" }}>
                        <Typography style={{ border: "2px solid black", padding: "0.5rem" }}> Feels With Reels </Typography>
                    </div>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginRight: "2rem" }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                style={{ backgroundColor: 'transparent' }}
                                color="inherit"
                            >
                                <HomeIcon onClick={handleBannerClick} style={{ height: "2rem", width: "2rem" }} />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                style={{ backgroundColor: 'transparent' }}
                                color="inherit">
                                <ExploreIcon onClick={handleExploreClick} style={{ height: "2rem", width: "2rem" }} />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                style={{ backgroundColor: 'transparent' }}
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar alt={userData.fullName} src={userData.profileImgUrl} style={{ height: "2rem", width: "2rem" }} />
                            </IconButton>
                        </div>
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