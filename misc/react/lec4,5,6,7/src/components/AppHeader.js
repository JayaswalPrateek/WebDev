import { useState } from "react";

const AppHeader = () => {
    const [loginButtonText, setLoginButtonText] = useState("Login")
    return (
        <header id="appHeader">
            <div id="logo" className="jua-regular">🥣 Spoonful</div>
            <nav id="navContainer" className="inter-bold">
                <ul id="navItems">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
                <button id="loginButton" className="inter-bold" onClick={() => setLoginButtonText(loginButtonText == 'Login' ? 'Log Out' : 'Login')}>
                    {loginButtonText}
                </button>
            </nav>
        </header>
    )
};
export default AppHeader;