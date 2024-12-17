import React from "react";
import ReactDOM from "react-dom/client";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import AppFooter from "./components/AppFooter";
import AboutUS from "./components/AboutUs";
import ContactUs from "./components/ContactUS";
import SmthWentWrong from "./components/SmthWentWrong";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const AppContainer = () => (
//     <div id="appContainer">
//         <AppHeader />
//         <AppMain />
//         <AppFooter />
//     </div >
// );

// const appRouter = createBrowserRouter([{
//     path: "/",
//     element: <AppContainer />,
//     errorElement: <SmthWentWrong />,
// }, {
//     path: "/about",
//     element: <AboutUS />,
// }, {
//     path: "contactUs",
//     element: <ContactUs />,
// }
// ]);

// root.render(<AppContainer />); without routing
// root.render(<RouterProvider router={appRouter} />); with routing

// Problem with this approach:
// the header and footer arent sticky across pages
// to make them persis across pages we need to us children routes

const AppContainer = () => (
    <div id="appContainer">
        <AppHeader /> {/* always visible */}
        {/* Conditionally render children here based on the route */}
        <Outlet /> { /* Just add this and it will take care of it */}
        <AppFooter /> {/* always visible */}
    </div >
);

const appRouter = createBrowserRouter([{
    path: "/",
    element: <AppContainer />,
    children: [
        {
            path: "/",
            element: <AppMain />,
        }, {
            path: "/about",
            element: <AboutUS />,
        }, {
            path: "contactUs",
            element: <ContactUs />,
        }],
    errorElement: <SmthWentWrong />,
}
]);

root.render(<RouterProvider router={appRouter} />);
