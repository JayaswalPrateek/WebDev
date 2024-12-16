import React from "react";
import ReactDOM from "react-dom/client";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import AppFooter from "./components/AppFooter";



const AppContainer = () => (
    <div id="appContainer">
        <AppHeader />
        <AppMain />
        <AppFooter />
    </div >
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppContainer />);