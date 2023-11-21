import { Component } from 'react';
import Logo from './LogoPollIT.PNG';
import Footer from './Footer';
import "./NavbarStyles.css";
import Popup from './Login';
import RegisterPopup from './Register';

class Navbar extends Component {
    state = {
        clicked: false,
        isLoginPopupOpen: false,
        isRegisterPopupOpen: false
    };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }


    openLoginPopup = () => {
        this.setState({ isLoginPopupOpen: true });
    }


    closeLoginPopup = () => {
        this.setState({ isLoginPopupOpen: false });
    }

    openRegisterPopup = () => {
        this.setState({ isRegisterPopupOpen: true });
    }

    closeRegisterPopup = () => {
        this.setState({ isRegisterPopupOpen: false });
    }

    render() {
        return (
            <div className="container">
                <nav>
                    <img src={Logo} className="App-logo" alt="logo" />
                    <div>
                        <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                            <li><a href="#" onClick={this.openLoginPopup}>Login</a></li>
                            <li><a href="#" onClick={this.openRegisterPopup}>Register</a></li>
                        </ul>
                    </div>
                    <div id="mobile" onClick={this.handleClick}>
                        <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </nav>

                <div className="content">
                    {/* CONTINUT */}
                </div>

                <Popup
                    trigger={this.state.isLoginPopupOpen}
                    setTrigger={this.closeLoginPopup}
                />

                <RegisterPopup
                    trigger={this.state.isRegisterPopupOpen}
                    setTrigger={this.closeRegisterPopup}
                />

                <Footer />

            </div>
        );
    }
}

export default Navbar;
