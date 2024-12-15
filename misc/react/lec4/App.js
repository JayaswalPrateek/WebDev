import React from "react";
import ReactDOM from "react-dom/client";

const AppHeader = () => (
    <header id="appHeader">
        <div id="logo" className="jua-regular">🥣 Spoonful</div>
        <nav id="navContainer" className="inter-bold">
            <ul id="navItems">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Cart</li>
            </ul>
        </nav>
    </header>
);

const Card = () => (
    <div className="card">
        <img className="cardImage" alt="La Pino'z Pizza" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f44bc9708c514cd2dd6ae0d8b4677214"></img>
        <div className="cardInfo">
            <h3>La Pino'z Pizza</h3>
            <h4><i>Italian</i></h4>
            <h4>30 mins</h4>
            <h4>4 ★</h4>
        </div>
    </div>
);

const AppMain = () => (
    <main id="appMain">
        <section id="searchContainer">
            Search
        </section>
        <section id="cardContainer">
            <Card />
        </section>
    </main >
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