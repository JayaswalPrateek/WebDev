import { useState } from "react";
import { Link } from "react-router";
// using <a href='/about'></a> for routing rerenders the entire page
// to avoid this, react-router provides Link to efficiently route to
// other pages by clicking on html elements without using <a href></a>
// which avoids unnecessary rerendering.
// <a href="/about">About Us</a> becomes <Link to="/about">About Us</Link>
/**
 * Hence React Apps are Single Page Applications
 * As the new page never really loads on top of an existing page
 * but instead the components common to both pages stay as it is
 * and only the new components are rendered and obsolete onse are
 * deleted all while staying in the same page.
 *
 * This is client side routing as once the app is loaded into
 * the browser then all the components are downloaded and only
 * api calls need network but in case of server side routing,
 * every time we route to a new page the server sends us a new
 * component or a new html file so we need network connectivity
 * while using the app even if we arent making api calls.
 */

const AppHeader = () => {
    const [loginButtonText, setLoginButtonText] = useState("Login")
    return (
        <header id="appHeader">
            <div id="logo" className="jua-regular">🥣 Spoonful</div>
            <nav id="navContainer" className="inter-bold">
                <ul id="navItems">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="contact">Contact Us</Link></li>
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