import { useContext } from "react";
import UserContext from "../utils/UserContext";

const AppFooter = () => {
    const { loggedInUsername } = useContext(UserContext);

    return (
        <footer id="appFooter" className="bg-[lightgrey] text-blue-500 font-bold py-4 mt-8">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-lg">
                    &copy; 2024 Spoonful Inc. All rights reserved |
                    Made with ❤️{loggedInUsername === "" ? "" : " for " + loggedInUsername}
                </p>
            </div>
        </footer>
    );
};

export default AppFooter;
