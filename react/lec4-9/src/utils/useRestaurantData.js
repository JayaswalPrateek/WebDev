import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantData = (restaurantID) => {
    const [statefulRestaurantData, setStatefulRestaurantData] = useState(null)

    useEffect(() => {
        // because the callback passed to useEffect() cant be async as React's useEffect() hates promises so this
        // pattern cirumvents this issue by making a call to another asycn method within useEffect()'s callback method
        fetchRestaurantData(restaurantID);
    }, []);

    const fetchRestaurantData = async () => {
        const data = await fetch(MENU_API + restaurantID);
        const json = await data.json();
        setStatefulRestaurantData(json);
    }

    return statefulRestaurantData;
}

export default useRestaurantData;
