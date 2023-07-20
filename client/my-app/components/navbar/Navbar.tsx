import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AppleIcon from '@mui/icons-material/Apple';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/isAuth/authContext'
import './navbar.css';


const pages = ['Home', 'Product', 'More'];
const settings = ['Profile', 'Logout'];

function Navbar() {
  const  useAuth = useContext(AuthContext)
  const { user, handleLogout } = useAuth;
  const [userImgUrl, setUserImgUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user's image from the API when the user object changes
    if (user && user.userId) {
      axios
        .get(`http://127.0.0.1:3000/users/getOne/${user.userId}`)
        .then((response) => {
          setUserImgUrl(response.data.imgUrl);
        })
        .catch((error) => {
          console.error('Error fetching user image:', error);
        });
    }
  }, [user]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleHome = () => {
    router.push('/homepage');
  };

  const handleProduct = () => {
    router.push('/products');
  };

  const handleMore = () =>{
    if(user.userRole === 'admin')
    router.push('/admin');
  }
  // The onClick event handler for buttons and menu items
  const handleButtonClick = (page: string) => {
    switch (page) {
      case 'Home':
        handleHome();
        break;
      case 'Product':
        handleProduct();
        break;
        case  'More' : 
        handleMore() ; 
        break ; 
      default:
        handleCloseNavMenu();
        break;
    }
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu(); // Close the user menu before logout
    handleLogout(); // Invoke the handleLogout function from the AuthProvider
    router.push('/login');
  };

  return (
    <AppBar className="navbr" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/homepage"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CHAFAY
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleButtonClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AppleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleButtonClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open your profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    userImgUrl ||
                    'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === 'Profile' ? handleProfileClick : handleLogoutClick
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
