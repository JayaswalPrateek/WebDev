import React from "react";
import ReactDOM from "react-dom/client";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import AppFooter from "./components/AppFooter";
import AboutUS from "./components/AboutUs";
import ContactUs from "./components/ContactUS";
import SmthWentWrong from "./components/SmthWentWrong";
import { createBrowserRouter, RouterProvider } from "react-router";

const AppContainer = () => (
    <div id="appContainer">
        <AppHeader />
        <AppMain />
        <AppFooter />
    </div >
);

const appRouter = createBrowserRouter([{
    path: "/",
    element: <AppContainer />,
    errorElement: <SmthWentWrong />,
}, {
    path: "/about",
    element: <AboutUS />,
}, {
    path: "contactUs",
    element: <ContactUs />,
}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppContainer />);
root.render(<RouterProvider router={appRouter} />);