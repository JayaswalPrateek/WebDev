// This should be a reusable dynamic component that is unique to each and every restaurant
// import { useEffect, useState } from "react"; Not Required coz abstracted by useRestaurantData
import ShimmerUI from "./ShimmerUI";
import { useParams } from "react-router"; // allows us to get a restaurant id from the route and use it to call the api
// and show the data that is specific to that restaurant
// import { MENU_API } from "../utils/constants"; Not Required coz abstracted by useRestaurantData
import useRestaurantData from "../utils/useRestaurantData";

const RestaurantMenu = () => {
    // const [statefulRestaurantData, setStatefulRestaurantData] = useState(null) abstracted by useRestaurantData
    const { restaurantID } = useParams()

    // fetching the data within the component violates the single responsiblilty principle
    // the component should only display the data and not fetch it as well. To solve this
    // problem, we can modularize the fetch call using custom hook: useRestaurantData
    // in a seperate file under utils directory.

    // const fetchRestaurantData = async () => {
    //     const data = await fetch(MENU_API + restaurantID);
    //     const json = await data.json();
    //     console.log(json); // To present the data on the UI we need to sync the data layer with the UI layer using state variables
    //     setStatefulRestaurantData(json);
    // }

    const statefulRestaurantData = useRestaurantData(restaurantID) // custom hook

    if (statefulRestaurantData == null) { return <ShimmerUI /> }

    const { name, costForTwo, cuisines, avgRating } = statefulRestaurantData.data.cards[2].card.card.info;
    const deliveryTime = statefulRestaurantData.data.cards[2].card.card.info.sla.slaString;
    const menu = statefulRestaurantData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards;
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
                {menu.map((dish) => {
                    const { id, name, defaultPrice, finalPrice, price } = dish.card.info;
                    const displayPrice = (defaultPrice ?? finalPrice ?? price) / 100;
                    return (
                        <li key={id}>
                            {name} @ ₹{displayPrice}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default RestaurantMenu;