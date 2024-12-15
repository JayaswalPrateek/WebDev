import React from "react";
import ReactDOM from "react-dom/client";

const AppHeader = () => (
    <header id="appHeader">
        <div id="logo">🥄 Spoonful</div>
        <nav id="navContainer">
            <ul id="navItems">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Cart</li>
            </ul>
        </nav>
    </header>
);

const AppMain = () => (
    <main id="appMain">

    </main>
);

const AppFooter = () => (
    <footer id="appFooter">
        <p>&copy; 2024 Spoonful Inc. All rights reserved.</p>
    </footer>
);

const AppContainer = () => (
    <div id="appContainer">
        <AppHeader />
        <AppMain />
        <AppFooter />
    </div >
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppContainer />);