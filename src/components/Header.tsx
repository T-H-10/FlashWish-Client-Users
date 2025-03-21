import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem } from '@mui/material';
import UseStylesHeader from './style/UseStyleHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { IsLogin } from '../App';
import { logoutUser } from './Logout';
import { UserContext } from '../types/UserTypes';


const Header = () => {
    const classes = UseStylesHeader();
    const { userDispatch } = useContext(UserContext);
    const [isLogin,setIsLogin] = useContext(IsLogin);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedButton, setSelectedButton] = useState<string>('home-page');
    const navigate = useNavigate();

    return (
        <>
            <AppBar className={classes.appBar} >
                <Toolbar className={classes.toolbar}>
                    <img src="../public/logo.jpg" alt="Logo" className={classes.logo} />
                    <Link to='/'>
                        <Button color="inherit" style={{ color: '#eeb451' }}
                            className={`${classes.menuButton} ${selectedButton === 'home-page' ? 'selected' : ''}`}
                            onClick={() => setSelectedButton('home-page')}>
                            עמוד בית
                        </Button>
                    </Link>
                    <Link to='/Gallery/templates'>
                    <Button color="inherit" style={{ color: '#eeb451' }}
                        className={`${classes.menuButton} ${selectedButton === 'choose-template' ? 'selected' : ''}`}
                        onClick={() => setSelectedButton('choose-template')}>
                        בחירת תבנית לרקע
                    </Button>
                    </Link>
                    <Button color="inherit" style={{ color: '#eeb451' }}
                        className={`${classes.menuButton} ${selectedButton === 'choose-content' ? 'selected' : ''}`}
                        onClick={() => setSelectedButton('choose-content')}>
                        בחירת תוכן לברכה
                    </Button>
                    <Button color="inherit" style={{ color: '#eeb451' }}
                        className={`${classes.menuButton} ${selectedButton === 'compose-blessing' ? 'selected' : ''}`}
                        onClick={() => setSelectedButton('compose-blessing')}>
                        הרכבת ברכה
                    </Button>
                    {isLogin && (
                        <Button color="inherit" style={{ color: '#eeb451' }}
                            className={`${classes.menuButton} ${selectedButton === 'personal-area' ? 'selected' : ''}`}
                            onClick={() => setSelectedButton('personal-area')}>
                            אזור אישי
                        </Button>
                    )}
                    <div style={{ flexGrow: 1 }} />
                    {!isLogin ? (
                        <>
                            <Link to='/login'>
                                <Button style={{ color: '#eeb451' }}
                                    className={`${classes.menuButton} ${selectedButton === 'login' ? 'selected' : ''}`}
                                    onClick={() => setSelectedButton('login')}>
                                    התחברות
                                </Button>
                            </Link>
                            <Link to='/register'>
                                <Button color="inherit" style={{ color: '#eeb451' }}
                                    className={`${classes.menuButton} ${selectedButton === 'register' ? 'selected' : ''}`}
                                    onClick={() => setSelectedButton('register')}>
                                    הרשמה
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" style={{ color: '#eeb451' }}
                                className={`${classes.menuButton} ${selectedButton === 'logout' ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedButton('logout');
                                    logoutUser(userDispatch, navigate, setIsLogin);
                                }}>
                                התנתקות
                            </Button>
                            <Avatar className={classes.avatar} onClick={(event) => setAnchorEl(event.currentTarget)} />
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                                <MenuItem onClick={() => setAnchorEl(null)} className={classes.menuItem}>
                                    פרטי משתמש
                                </MenuItem>
                                <MenuItem onClick={() => setAnchorEl(null)} className={classes.menuItem}>
                                    עדכון פרטי משתמש
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Header;