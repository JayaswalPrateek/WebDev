import { useSelector } from "react-redux";
import AccordianList from "./AccordianList";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Cart = () => {
    const cart = useSelector((store) => store.cart.items)
    const data = {
        itemCards: cart,
        noAdd: true
    }

    console.log(cart)

    const totalPrice = cart.reduce((sum, item) => {
        const price = item.card.info.price ?? item.card.info.defaultPrice;
        return sum + (Number(price) / 100);
    }, 0);

    const { loggedInUsername } = useContext(UserContext);

    return (
        <div id="cart" className="text-center m-1 p-10">
            {
                (cart.length != 0) ?
                    <div className="w-6/12 mx-auto my-4 bg-[lightgrey] shadow-lg p-4">
                        <AccordianList data={data} />
                        <div className="flex justify justify-between">
                            <h1 className="text-4xl font-bold text-left pl-6">Total</h1>
                            <h1 className="text-4xl font-bold text-right pr-6">₹ {totalPrice}</h1>
                        </div>
                    </div>
                    : <div>
                        <h1 className="text-6xl font-semibold text-center pt-10">Cart is Empty</h1>
                        <h1 className="text-2xl font-semibold text-center pt-2 text-stone-500">
                            {loggedInUsername === "" ? "" : "Hey " + loggedInUsername + ", "}What are you craving today?
                        </h1>
                    </div>
            }
        </div>
    );
};

export default Cart;