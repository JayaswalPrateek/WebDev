import React from "react";
import ReactDOM from "react-dom/client";

import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import AppFooter from "./components/AppFooter";
import AboutUS from "./components/AboutUs";
import ContactUs from "./components/ContactUS";
import SmthWentWrong from "./components/SmthWentWrong";
import RestaurantMenu from "./components/RestaurantMenu";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

// lec 11:
import { useState } from "react";
import UserContext from "./utils/UserContext";

//lec 12:
import { Provider } from "react-redux";
import reduxStore from "./utils/reduxStore";

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

const AppContainer = () => {
    const [username, setUsername] = useState("");
    return (
        <Provider store={reduxStore}> {/* lec 12 */}
            <UserContext.Provider value={{ loggedInUsername: username }}> {/* lec 11 */}
                <div id="appContainer" className="flex flex-col flex-grow justify-between h-screen">
                    <div>
                        <AppHeader username={username} setUsername={setUsername} /> {/* always visible */}
                        {/* Conditionally render children here based on the route */}
                        <Outlet /> { /* Just add this and it will take care of it */}
                    </div>
                    <AppFooter /> {/* always visible */}
                </div >
            </UserContext.Provider>
        </Provider>
    );
}

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
            path: "/contact",
            element: <ContactUs />,
        }, {
            path: "/restaurant/:restaurantID", // makes this a dynamic route
            // so depending upon the specified name of the restaurant, we
            // make sure to load the menu specific to that restaurant.
            element: <RestaurantMenu />
        }],
    errorElement: <SmthWentWrong />,
}
]);

root.render(<RouterProvider router={appRouter} />);
