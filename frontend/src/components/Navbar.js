import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './LogoPollIT.PNG';
import "./NavbarStyles.css";
import Popup from './Login';
import RegisterPopup from './Register';
import CreatePollPopup from './CreatePollPopup';

const Navbar = () => {
    const [clicked, setClicked] = useState(false);
    const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
    const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
    const [isCreatePollPopupOpen, setCreatePollPopupOpen] = useState(false);
    const [isLoginMode, setLoginMode] = useState(true);
    const [isBlurBackground, setBlurBackground] = useState(false);

    const location = useLocation();
    const { pathname } = location;

    const handleClick = () => {
        setClicked(!clicked);
    }

    const closeMenu = () => {
        setClicked(false);
    }

    const openLoginPopup = () => {
        closeMenu();
        setLoginPopupOpen(true);
        setRegisterPopupOpen(false);
        setCreatePollPopupOpen(false);
        setLoginMode(true);
        setBlurBackground(true);
    }

    const openRegisterPopup = () => {
        closeMenu();
        setRegisterPopupOpen(true);
        setLoginPopupOpen(false);
        setCreatePollPopupOpen(false);
        setLoginMode(false);
        setBlurBackground(true);
    }

    const openCreatePollPopup = () => {
        closeMenu();
        console.log('Trying to open Create Poll Popup');
        setCreatePollPopupOpen(true);
        setLoginPopupOpen(false);
        setRegisterPopupOpen(false);
        setLoginMode(true);
        setBlurBackground(true);
    }

    const closeLoginPopup = () => {
        setLoginPopupOpen(false);
        setBlurBackground(false);
    }

    const closeRegisterPopup = () => {
        setRegisterPopupOpen(false);
        setBlurBackground(false);
    }

    const closeCreatePollPopup = () => {
        setCreatePollPopupOpen(false);
        setBlurBackground(false);
    }

    const shouldOpenCreatePollPopup = pathname === '/createpollpage';

    return (
        <div className="container">
            <nav>
                <img src={Logo} className="App-logo" alt="logo" />
                <div>
                    <ul id="navbar" className={clicked ? "active" : ""}>
                        {pathname === '/' && (
                            <>
                                <li><a href="#" onClick={openLoginPopup}>Login</a></li>
                                <li><a href="#" onClick={openRegisterPopup}>Register</a></li>
                            </>
                        )}
                        {pathname === '/createpollpage' && (
                            <>
                                <li><a href="#" onClick={openCreatePollPopup}>Create Poll</a></li>
                                <li><Link to="/">Log out</Link></li>
                            </>
                        )}
                    </ul>
                </div>
                <div id="mobile" onClick={handleClick}>
                    <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </nav>

            <div className="content">
                {/* CONTINUT */}
            </div>

            <div className={isBlurBackground ? "blur-background" : ""}></div>

            <Popup
                trigger={isLoginPopupOpen}
                setTrigger={closeLoginPopup}
                isLoginMode={isLoginMode}
            />

            <RegisterPopup
                trigger={isRegisterPopupOpen}
                setTrigger={closeRegisterPopup}
                isLoginMode={isLoginMode}
            />

            <CreatePollPopup
                trigger={isCreatePollPopupOpen}
                setTrigger={closeCreatePollPopup}
            />
        </div>
    );
}

export default Navbar;
