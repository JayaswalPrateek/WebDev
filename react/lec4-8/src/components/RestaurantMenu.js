// This should be a reusable dynamic component that is unique to each and every restaurant
import { useEffect, useState } from "react";
import ShimmerUI from "./ShimmerUI";
import { useParams } from "react-router"; // allows us to get a restaurant id from the route and use it to call the api
// and show the data that is specific to that restaurant
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
    const [statefulRestaurantInfo, setStatefulRestaurantInfo] = useState(null)
    const { restaurantID } = useParams()

    const fetchRestaurantData = async () => {
        const data = await fetch(MENU_API + restaurantID);
        const json = await data.json();
        console.log(json); // To present the data on the UI we need to sync the data layer with the UI layer using state variables
        setStatefulRestaurantInfo(json);
    }

    useEffect(() => { fetchRestaurantData() }, []);

    if (statefulRestaurantInfo == null) { return <ShimmerUI /> }

    const { name, costForTwo, cuisines, avgRating } = statefulRestaurantInfo.data.cards[2].card.card.info;
    const deliveryTime = statefulRestaurantInfo.data.cards[2].card.card.info.sla.slaString;
    const menu = statefulRestaurantInfo.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards;
    console.log(menu)
    return (
        <section id="restaurantMenu">
            <h1>{name}</h1>
            <h3>{cuisines.join(', ')}</h3>
            <h3>₹{costForTwo / 100} for two</h3>
            <h3>{deliveryTime}</h3>
            <h3>{avgRating}★</h3>
            <h3>Menu</h3>
            <ul>
                {menu.map((dish) => (
                    <li id={dish.card.info.id}>
                        {dish.card.info.name} @ ₹{dish.card.info.defaultPrice / 100}
                    </li>)
                )}
            </ul>
        </section>
    );
};

export default RestaurantMenu;